import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieURLService } from '../apiService/app.movieURLService';

@Component({
    templateUrl: 'app.home.html',
    styleUrls: ['app.home.scss'],
    providers: [MovieURLService]
})

export class HomeComponent {
    moviesArray: Array<any>;
    movieUrls: Array<any>;
    currentMovie: any;
    isImageLoaded: Boolean;

    constructor(private _http: HttpClient, private movieAPI: MovieURLService) {}

    ngOnInit() {
        this.currentMovie = {};
        this.getMovies(this.movieAPI.getRecentMoviesURL());
        this.isImageLoaded = false;
        // this.currentMovie = {};
        // this.currentMovie['url'] = 'https://image.tmdb.org/t/p/original/vw3zNfzvnVNF7nIjpiEgcdznfeC.jpg';
    } 

    getUrl(div) {
        if(!this.isImageLoaded && this.currentMovie.url !== undefined) {
            console.log(this.currentMovie);
            console.log(div.style);
            div.style.backgroundImage = "url(" + this.currentMovie.url + ")";
            this.isImageLoaded = true;

        } 
    }

    getMovies(URL: string) {
        this._http.get<any>(URL)
          .subscribe(data => {
            this.movieUrls = [];
            this.moviesArray = data.results;
            // console.log(this.moviesArray); // 

            this.moviesArray.forEach((movie,index) =>{
                if (movie.backdrop_path !== null && index % 2 === 0) {
                    let obj = {};
                    obj['url'] = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
                    obj['title'] = movie.title;
                    this.movieUrls.push(obj);
                    // console.log(obj); //
                }
            });
            this.currentMovie = this.movieUrls[0];
            // console.log(this.currentMovie); // 
          }, 
          error =>{
            alert(error);
            console.error(error)
          })
    }

    previousSlide() {
        console.log('previous')
    }

    nextSlide() {
        console.log('next')

    }
 }
