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
    // isImageLoaded: boolean;

    @ViewChild('slider', {static: false}) sliderEl:ElementRef;
    @ViewChild('firstImage', {static: false}) firstEl:ElementRef;
    @ViewChild('secondImage', {static: false}) secondEl:ElementRef;
    @ViewChild('thirdImage', {static: false}) thirdEl:ElementRef;
    @ViewChild('fourthImage', {static: false}) fourthEl:ElementRef;
    @ViewChild('fifthImage', {static: false}) fifthEl:ElementRef;

    constructor(private _http: HttpClient, private movieAPI: MovieURLService) {}

    ngOnInit() {
        this.currentMovie = {};
        this.getMovies(this.movieAPI.getRecentMoviesURL());
        // this.isImageLoaded = false;
    } 

    getUrl() {
        // if(!this.isImageLoaded && this.currentMovie.url !== undefined) {
            // console.log(this.currentMovie);
            // console.log(this.firstEl.nativeElement.style);
            // this.currentEl.nativeElement.style.backgroundImage = "url(" + this.currentMovie.url + ")";
            // this.isImageLoaded = true;
        // } 
    }

    getMovies(URL: string) {
        this._http.get<any>(URL)
          .subscribe(data => {
            this.movieUrls = [];
            this.moviesArray = data.results;
            console.log(this.moviesArray); // 

            this.moviesArray.forEach((movie,index) =>{
                if (this.movieUrls.length < 5 && movie.backdrop_path !== null && movie.vote_average > 4) {
                    let obj = {};
                    obj['url'] = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
                    obj['title'] = movie.title;
                    obj['type'] = 'LATEST';
                    this.movieUrls.push(obj);
                }
            });

            for (let i = this.movieUrls.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [this.movieUrls[i], this.movieUrls[j]] = [this.movieUrls[j], this.movieUrls[i]];
            }

            console.log(this.movieUrls); // 

            if(this.movieUrls.length === 5) {
                this.currentIndex = 0;
                this.currentMovie = this.movieUrls[0];
                this.firstEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[0].url + ")";
                this.secondEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[1].url + ")";
                this.thirdEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[2].url + ")";
                this.fourthEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[3].url + ")";
                this.fifthEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[4].url + ")";
            }  
          }, 
          error =>{
            alert(error);
            console.error(error)
          })
    }

    previousSlide() {
        if(this.currentIndex > 0) {
            this.currentIndex--;

        } else {
            this.currentIndex = this.movieUrls.length - 1;
        }

        this.currentMovie = this.movieUrls[this.currentIndex];

        // if(this.currentIndex === 0) {
        //     this.currentIndex = this.movieUrls.length - 1;

        // } else {
        //     this.currentIndex--;
        // }

        // this.currentMovie = this.movieUrls[this.currentIndex];
        // this.currentEl.nativeElement.style.backgroundImage = "url(" + this.currentMovie.url + ")";
    }

    nextSlide() {
        if(this.currentIndex < 4) {
            this.currentIndex++;

        } else {
            this.currentIndex = 0;
        }

        this.currentMovie = this.movieUrls[this.currentIndex];

        // this.sliderEl.nativeElement.style.animation = "2s slideright forwards";
        // console.log(this.sliderEl.nativeElement.style.animation)
        // const originalIndex = this.currentIndex;

        // if(this.currentIndex === this.movieUrls.length - 1) {
        //     this.currentIndex = 0;

        // } else {
        //     this.currentIndex++;
        // }

        // this.currentMovie = this.movieUrls[this.currentIndex];

        // setTimeout(()=> {
        //     // l

        //     this.currentEl.nativeElement.style.backgroundImage = "url(" + this.currentMovie.url + ")";
        // }, 2000);        
    }
 }
