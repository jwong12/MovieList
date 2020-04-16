import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieURLService } from '../apiService/app.movieURLService';
import { IImage } from './IImage';

@Component({
    templateUrl: 'app.home.html',
    styleUrls: ['app.home.scss'],
    providers: [MovieURLService]
})

export class HomeComponent {
    moviesArray: Array<any>;
    imageUrls: (string | IImage)[];

    @ViewChild('slideshow', {static: false}) slideshow: any;

    constructor(private _http: HttpClient, private movieAPI: MovieURLService) {
        this.imageUrls = [];
    }

    ngOnInit() {
        this.getMovies(this.movieAPI.getRecentMoviesURL());
    } 

    getMovies(URL: string) {
        this._http.get<any>(URL)
          .subscribe(data => {
            this.moviesArray = data.results;
            console.log(this.moviesArray); // 

            this.moviesArray.forEach((movie,index) =>{
                if (movie.backdrop_path !== null && index % 2 === 0) {
                    const iImage = <IImage>{};
                    iImage['url'] = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
                    iImage['title'] = movie.title;
                    iImage['href'] = '/watchlist';
                    console.log(iImage) //
                    this.imageUrls.push(iImage);
                }
            });
            console.log(this.imageUrls); // 
          }, 
          error =>{
            alert(error);
            console.error(error)
          })
    }
 }
