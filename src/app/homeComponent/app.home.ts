import { Component, ViewChild, ElementRef } from '@angular/core';
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
    currentIndex: number;
    isImageLoaded: boolean;

    @ViewChild('currentImage', {static: false}) currentEl:ElementRef;
    @ViewChild('prevImage', {static: false}) prevEl:ElementRef;
    @ViewChild('nextImage', {static: false}) nextEl:ElementRef;

    constructor(private _http: HttpClient, private movieAPI: MovieURLService) {}

    ngOnInit() {
        this.currentMovie = {};
        this.getMovies(this.movieAPI.getRecentMoviesURL());
        this.isImageLoaded = false;
    } 

    getUrl() {
        if(!this.isImageLoaded && this.currentMovie.url !== undefined) {
            console.log(this.currentMovie);
            console.log(this.currentEl.nativeElement.style);
            this.currentEl.nativeElement.style.backgroundImage = "url(" + this.currentMovie.url + ")";
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
                    obj['type'] = 'LATEST';
                    this.movieUrls.push(obj);
                }
            });
            if(this.movieUrls.length > 0) {
                this.currentMovie = this.movieUrls[0];
                this.currentIndex = 0;
            }  
          }, 
          error =>{
            alert(error);
            console.error(error)
          })
    }

    previousSlide() {
        if(this.currentIndex === 0) {
            this.currentIndex = this.movieUrls.length - 1;

        } else {
            this.currentIndex--;
        }

        this.currentMovie = this.movieUrls[this.currentIndex];
        this.currentEl.nativeElement.style.backgroundImage = "url(" + this.currentMovie.url + ")";
    }

    nextSlide() {
        if(this.currentIndex === this.movieUrls.length - 1) {
            this.currentIndex = 0;

        } else {
            this.currentIndex++;
        }

        this.currentMovie = this.movieUrls[this.currentIndex];
        this.currentEl.nativeElement.style.backgroundImage = "url(" + this.currentMovie.url + ")";
    }
 }
