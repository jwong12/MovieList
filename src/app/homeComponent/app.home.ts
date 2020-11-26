import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieURLService } from '../apiService/app.movieURLService';
import { ModalService } from '../movieModal';

@Component({
    templateUrl: 'app.home.html',
    styleUrls: ['app.home.scss'],
    providers: [MovieURLService]
})

export class HomeComponent {
    genres: Array<any>;
    moviesArray: Array<any>;
    movieUrls: Array<any>;
    innerWidth: any;
    currentMovie: any;
    currentIndex: number;
    leftArrowAnimToggle: boolean;
    rightArrowAnimToggle: boolean;

    @ViewChild('slider', {static: false}) sliderEl:ElementRef;
    @ViewChild('firstImage', {static: false}) firstEl:ElementRef;
    @ViewChild('secondImage', {static: false}) secondEl:ElementRef;
    @ViewChild('thirdImage', {static: false}) thirdEl:ElementRef;
    @ViewChild('fourthImage', {static: false}) fourthEl:ElementRef;
    @ViewChild('fifthImage', {static: false}) fifthEl:ElementRef;
    @ViewChild('leftArrowDiv', {static: false}) leftArrowDivEl:ElementRef;
    @ViewChild('rightArrowDiv', {static: false}) rightArrowDivEl:ElementRef;
    @ViewChild('leftArrow', {static: false}) leftArrowEl:ElementRef;
    @ViewChild('rightArrow', {static: false}) rightArrowEl:ElementRef;

    constructor(private _http: HttpClient, private movieAPI: MovieURLService, private modalService: ModalService) {}

    ngOnInit() {        
        this.currentMovie = {};
        this.leftArrowAnimToggle = false;
        this.rightArrowAnimToggle = false;
        this.innerWidth = window.innerWidth;
        this.getGenres(this.movieAPI.getGenreURL());
    } 

    openModal(id: string, movie) {
        this.modalService.open(id, movie, this.genres);
    }

    getGenres(URL: string) {
        this._http.get<any>(URL)
        .subscribe(data => {
            this.genres = [...data.genres];
            this.getMovies(this.movieAPI.getRecentMoviesURL());
        }, 
        error =>{
          console.error(error);
        })
    }

    getMovies(URL: string) {
        this._http.get<any>(URL)
            .subscribe(data => {
                this.movieUrls = [];
                this.moviesArray = this.shuffle(data.results);
                this.moviesArray.forEach(movie =>{
                    if (this.movieUrls.length < 5 && movie.backdrop_path !== null && movie.popularity < 1200 && movie.vote_average > 4.5) {
                        let obj = {}; 
                        obj['url'] = 'https://image.tmdb.org/t/p/w1280/' + movie.backdrop_path;
                        obj['title'] = movie.title;
                        obj['type'] = 'LATEST';
                        obj['movie'] = movie;

                        if(movie.genre_ids.length >= 0) {
                            this.genres.forEach((item) => {
                                if(item.id === movie.genre_ids[0]) {
                                    obj['caption'] = item.name + ' | ' + movie.vote_average + ' Rating';
                                    return;
                                }
                            });
                        }

                        this.movieUrls.push(obj);
                    }
                });

                for (let i = this.movieUrls.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [this.movieUrls[i], this.movieUrls[j]] = [this.movieUrls[j], this.movieUrls[i]];
                }

                if(this.movieUrls.length === 5) {
                    this.currentIndex = 0;
                    this.currentMovie = this.movieUrls[0];
                    this.firstEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[0].url + ")";
                    this.secondEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[1].url + ")";
                    this.thirdEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[2].url + ")";
                    this.fourthEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[3].url + ")";
                    this.fifthEl.nativeElement.style.backgroundImage = "url(" + this.movieUrls[4].url + ")";
                }  
            }, error =>{
                console.error(error);
            });
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex--);
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    setSlidesAnimationSpeed() {
        if (this.innerWidth < 600) {
            this.sliderEl.nativeElement.style.animationDuration = "200ms";
            
        } else {
            this.sliderEl.nativeElement.style.animationDuration = "400ms";
        }
    }

    previousSlide() {
        this.setSlidesAnimationSpeed();

        switch(this.currentIndex) {
            case 0:
                this.sliderEl.nativeElement.style.animationName = "lslide-to-five";
                this.sliderEl.nativeElement.style.animationDuration = "300ms";
                this.currentIndex = 4;
                break;
            case 1:
                this.sliderEl.nativeElement.style.animationName = "lslide-to-one";
                this.currentIndex--;
                break;
            case 2:
                this.sliderEl.nativeElement.style.animationName = "lslide-to-two";
                this.currentIndex--;
                break;
            case 3:
                this.sliderEl.nativeElement.style.animationName = "lslide-to-three";
                this.currentIndex--;
                break;
            case 4:
                this.sliderEl.nativeElement.style.animationName = "lslide-to-four";
                this.currentIndex--;
                break;
            default:
        }

        this.currentMovie = this.movieUrls[this.currentIndex];

        if(this.leftArrowAnimToggle) {
            this.leftArrowDivEl.nativeElement.style.animation = "arrow-effect-1 400ms 1";
            this.leftArrowEl.nativeElement.style.animation = "arrow-opacity-1 400ms 1";
            this.leftArrowAnimToggle = false;

        } else {
            this.leftArrowDivEl.nativeElement.style.animation = "arrow-effect-2 400ms 1";
            this.leftArrowEl.nativeElement.style.animation = "arrow-opacity-2 400ms 1";
            this.leftArrowAnimToggle = true;
        }
    }

    nextSlide() {
        this.setSlidesAnimationSpeed();

        switch(this.currentIndex) {
            case 0:
                this.sliderEl.nativeElement.style.animationName = "rslide-to-two";
                this.currentIndex++;
                break;
            case 1:
                this.sliderEl.nativeElement.style.animationName = "rslide-to-three";
                this.currentIndex++;
                break;
            case 2:
                this.sliderEl.nativeElement.style.animationName = "rslide-to-four";
                this.currentIndex++;
                break;
            case 3:
                this.sliderEl.nativeElement.style.animationName = "rslide-to-five";
                this.currentIndex++;
                break;
            case 4:
                this.sliderEl.nativeElement.style.animationName = "rslide-to-one";
                this.sliderEl.nativeElement.style.animationDuration = "300ms";
                this.currentIndex = 0;
                break;
            default:
                break;
        }

        this.currentMovie = this.movieUrls[this.currentIndex];     
        
        if(this.rightArrowAnimToggle) {
            this.rightArrowDivEl.nativeElement.style.animation = "arrow-effect-1 400ms 1";
            this.rightArrowEl.nativeElement.style.animation = "arrow-opacity-1 400ms 1";
            this.rightArrowAnimToggle = false;

        } else {
            this.rightArrowDivEl.nativeElement.style.animation = "arrow-effect-2 400ms 1";
            this.rightArrowEl.nativeElement.style.animation = "arrow-opacity-2 400ms 1";
            this.rightArrowAnimToggle = true;
        }
    }
 }
