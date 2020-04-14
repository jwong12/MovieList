import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { MovieURLService } from '../apiService/app.movieURLService';
import { ModalService } from '../movieModal';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class genre {
    constructor(public id: number, public name: string) {}
}

@Component({
    templateUrl: 'app.home.html',
    styleUrls: ['app.home.scss'],
    providers: [MovieURLService]
})

export class HomeComponent {
    movieArray: Array<any>;
    genreArray: Array<genre>;
    genreSelect: genre;
    title: string;
    currentPage: number;
    totalPages: number;
    totalMovies: number;

    constructor(private _http: HttpClient, private scroller: ViewportScroller, private movieAPI: MovieURLService, private modalService: ModalService) {
        this.title = "Recent Movies";
    }

    ngOnInit() {
        this.getMovies(this.movieAPI.getRecentMoviesURL());
        this.getGenres(this.movieAPI.getGenreURL());
    }    

    getMovies(URL: string) {
        this._http.get<any>(URL)
          .subscribe(data => {
            this.movieArray  = data.results;
            this.currentPage = data.page;
            this.totalPages = data.total_pages;
            this.totalMovies = data.total_results;
            this.formatDescription();
          }, 
          error =>{
            alert(error);
            console.error(error)
          })
    }

    getGenres(URL: string) {
        this.genreSelect = { id: 1, name: "Recent Movies" };
        this.genreArray = [this.genreSelect];

        this._http.get<any>(URL)
        .subscribe(data => {
            this.genreArray = [...this.genreArray, ...data.genres];
        }, 
        error =>{
          alert(error);
          console.error(error)
        })
    }

    formatDescription() {
        for(let i = 0; i < this.movieArray.length; i++) {
            const titleLength = this.movieArray[i].title.length;

            if (titleLength > 53) {
                this.movieArray[i].titleFontSize = '12px';
                    
            } else if (titleLength > 50) {
                this.movieArray[i].titleFontSize = '13px';
                    
            } else if (titleLength > 40) {
                this.movieArray[i].titleFontSize = '14px';
                    
            } else if (titleLength > 32) {
                this.movieArray[i].titleFontSize = '15px';

            } else if (titleLength > 21) {
                this.movieArray[i].titleFontSize = '16px';

            } else {
                this.movieArray[i].titleFontSize = '17px';
            }
        }
    }

    formatDate(date) {
        const month = MONTHS[parseInt(date.slice(5,7))-1];
        return month + ' ' + date.slice(8) + ', ' + date.slice(0,4);
    }

    openModal(id: string, movie) {
        this.modalService.open(id, movie, this.genreArray);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    nextPage(isBottom: boolean) {
        if(this.currentPage !== this.totalPages) {
            if(this.genreSelect.id === 1) {
                this.getMovies(this.movieAPI.getRecentMoviesURL(++this.currentPage));

            } else {
                this.getMovies(this.movieAPI.getMoviesURL(this.genreSelect.id, ++this.currentPage));
            }

            if(isBottom) {
                this.scroller.scrollToAnchor('content-wrapper');
            }
        }
    }

    prevPage(isBottom: boolean) {
        if(this.currentPage !== 1) {
            if(this.genreSelect.id === 1) {
                this.getMovies(this.movieAPI.getRecentMoviesURL(--this.currentPage));

            } else {
                this.getMovies(this.movieAPI.getMoviesURL(this.genreSelect.id, --this.currentPage));
            }

            if(isBottom) {
                this.scroller.scrollToAnchor('content-wrapper');
            }
        }
    }

    selectGenre(genreSel: genre){
        if(genreSel !== undefined && genreSel.id === 1) {
            this.genreSelect = genreSel;
            this.title = this.genreSelect.name;
            this.getMovies(this.movieAPI.getRecentMoviesURL());

        } else {
            this.genreSelect = genreSel;
            console.log(genreSel)
            console.log(this.genreSelect)
            this.title = this.genreSelect.name;
            this.getMovies(this.movieAPI.getMoviesURL(this.genreSelect.id, 1));
        }
    }
 }
