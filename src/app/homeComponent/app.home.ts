import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
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
    innerWidth: any;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }

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
    } 

    getMovies(URL: string) {
        this._http.get<any>(URL)
          .subscribe(data => {
            this.movieUrls = [];
            this.moviesArray = data.results;
            // console.log(this.moviesArray); // 

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
        switch(this.currentIndex) {
            case 0:
                this.sliderEl.nativeElement.style.animation = "1s lslide-to-five forwards";
                this.currentIndex = 4;
                break;
            case 1:
                this.sliderEl.nativeElement.style.animation = (this.innerWidth < 768 ? "1s lslide-to-one forwards" : "2s lslide-to-one forwards");
                this.currentIndex--;
                break;
            case 2:
                this.sliderEl.nativeElement.style.animation = (this.innerWidth < 768 ? "1s lslide-to-two forwards" : "2s lslide-to-two forwards");
                this.currentIndex--;
                break;
            case 3:
                this.sliderEl.nativeElement.style.animation = (this.innerWidth < 768 ? "1s lslide-to-three forwards" : "2s lslide-to-three forwards");
                this.currentIndex--;
                break;
            case 4:
                this.sliderEl.nativeElement.style.animation = (this.innerWidth < 768 ? "1s lslide-to-four forwards" : "2s lslide-to-four forwards");
                this.currentIndex--;
                break;
            default:
                break;
        }

        this.currentMovie = this.movieUrls[this.currentIndex];
    }

    nextSlide() {
        switch(this.currentIndex) {
            case 0:
                this.sliderEl.nativeElement.style.animation = (this.innerWidth < 768 ? "1s rslide-to-two forwards" : "2s rslide-to-two forwards");
                this.currentIndex++;
                break;
            case 1:
                this.sliderEl.nativeElement.style.animation = (this.innerWidth < 768 ? "1s rslide-to-three forwards" : "2s rslide-to-three forwards");
                this.currentIndex++;
                break;
            case 2:
                this.sliderEl.nativeElement.style.animation = (this.innerWidth < 768 ? "1s rslide-to-four forwards" : "2s rslide-to-four forwards");
                this.currentIndex++;
                break;
            case 3:
                this.sliderEl.nativeElement.style.animation = (this.innerWidth < 768 ? "1s rslide-to-five forwards" : "2s rslide-to-five forwards");
                this.currentIndex++;
                break;
            case 4:
                this.sliderEl.nativeElement.style.animation = "1s rslide-to-one forwards";
                this.currentIndex = 0;
                break;
            default:
                break;
        }

        this.currentMovie = this.movieUrls[this.currentIndex];      
    }
 }
