import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieURLService } from './app.movieURLService';
import { ModalService } from './movieModal';

const movieLink = "http://image.tmdb.org/t/p/w185";

class genre {
    constructor(public id: number, public name: string) {}
}

@Component({
    templateUrl: 'app.home.html',
    styleUrls: ['app.home.scss'],
    providers: [MovieURLService]
})

export class HomeComponent {
    _movieArray: Array<any>;
    _genreArray: Array<genre>;
    _http: HttpClient;
    movieAPI: MovieURLService;
    genreSelect: genre;
    title: string;
    currentPage: number;
    totalPages: number;
    totalMovies: number;

    constructor(private http: HttpClient, movieService: MovieURLService, private modalService: ModalService) {
        this._http = http;
        this.movieAPI = movieService;
        this.title = "Recent Movies";
    }

    ngOnInit() {
        this.getMovies(this.movieAPI.getRecentMoviesURL());
        this.getGenres(this.movieAPI.getGenreURL());
    }    

    getMovies(URL: string) {
        this._http.get<any>(URL)
          .subscribe(data => {
            this._movieArray  = data.results;
            this.currentPage = data.page;
            this.totalPages = data.total_pages;
            this.totalMovies = data.total_results;
          }, 
          error =>{
            alert(error);
            console.error(error)
          })
    }

    getGenres(URL: string) {
        this._http.get<any>(URL)
        .subscribe(data => {
            this._genreArray = data.genres;
        }, 
        error =>{
          alert(error);
          console.error(error)
        })
    }

    openModal(id: string, name) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    nextPage() {
        if(this.currentPage !== this.totalPages) {
            if(this.genreSelect === undefined || this.genreSelect === null) {
                this.getMovies(this.movieAPI.getRecentMoviesURL(++this.currentPage));
            } else {
                this.getMovies(this.movieAPI.getMoviesURL(this.genreSelect.id, ++this.currentPage));
            }
        }
    }

    prevPage() {
        if(this.currentPage !== 1) {
            if(this.genreSelect === undefined || this.genreSelect === null) {
                this.getMovies(this.movieAPI.getRecentMoviesURL(--this.currentPage));
            } else {
                this.getMovies(this.movieAPI.getMoviesURL(this.genreSelect.id, --this.currentPage));
            }
        }
    }

    selectGenre(genreSel: genre){
        this.genreSelect = genreSel;
        this.title = this.genreSelect.name;
        this.getMovies(this.movieAPI.getMoviesURL(this.genreSelect.id, 1));
    }
 }
