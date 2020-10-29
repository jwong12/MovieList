import { Component, Input, ViewChild, HostListener, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { MovieURLService } from '../apiService/app.movieURLService';
import { ModalService } from '../movieModal';
import { NgxSpinnerService } from "ngx-spinner";

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class Genre {
    constructor(public id: number, public name: string) {}
}

@Component({
    selector: 'movies-directive',
    templateUrl: 'app.movies.html',
    styleUrls: ['app.movies.scss'],
    providers: [MovieURLService]
})

export class MoviesComponent {
    movieArray: Array<any>;
    genreArray: Array<Genre>;
    prevGenre: Genre;
    genreSelect: Genre;
    genreName: string;
    showGenres: boolean = false;
    currentPage: number = 1;
    totalPages: number;
    totalMovies: number;
    _searchText: string;
    parameter: string;
    isSearched: boolean;
    isUsingPagination: boolean;
    isFinishedLoading: boolean = false;
    httpRequest: any;

    @Input() set searchText(value: string) {
        this._searchText = value.toUpperCase();
        if(this.searchText !== null && this.searchText !== undefined) {
            let param = '';

            [...value].forEach(char => {
                if(char === ' ') {
                    param += '-'
                } else {
                    param += char;
                }
            });

            const searchURL = this.movieAPI.getSearchURL() + param;
            this.getMovies(searchURL);
            this.getGenres(this.movieAPI.getGenreURL());
            this.isSearched = true; 
            this.parameter = param;
        }
    }

    @ViewChild('genreSelected', { read: ElementRef, static: false }) genreSelectedEl:ElementRef;
    @ViewChild('genresWrapper', { read: ElementRef, static: false }) genresWrapperEl:ElementRef;

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.showGenres && this.genreSelectedEl !== undefined && this.genreSelectedEl.nativeElement.contains(event.target)) {
            this.showGenres = true;
            this.genreSelectedEl.nativeElement.style.backgroundColor = "rgb(42, 177, 212)";
            this.genreSelectedEl.nativeElement.style.color = "white";
            this.genreSelectedEl.nativeElement.style.boxShadow = "0 1px 3px 1px rgb(0, 0, 0, 0.25)";
            this.genreSelectedEl.nativeElement.removeEventListener("mouseover", this.changeGenreSelectedOnMouseOver);
            this.genreSelectedEl.nativeElement.removeEventListener("mouseleave", this.changeGenreSelectedOnMouseLeave);

        } else if (this.showGenres && this.genreSelectedEl !== undefined && this.genreSelectedEl.nativeElement.contains(event.target)) {
            this.applyStylesToGenreSelected();

        } else if (this.showGenres && this.genreSelectedEl !== undefined && !this.genreSelectedEl.nativeElement.contains(event.target) && 
                    this.genresWrapperEl !== undefined && !this.genresWrapperEl.nativeElement.contains(event.target)) {
            this.applyStylesToGenreSelected();
        } 
    }

    get searchText(): string {
        return this._searchText;
    }

    constructor(private _http: HttpClient, private scroller: ViewportScroller, private movieAPI: MovieURLService, private modalService: ModalService, private spinner: NgxSpinnerService) {
        this.movieArray = [];
        this.isUsingPagination = false;
    }

    ngOnInit() {
        if(this.searchText === null || this.searchText === undefined) {
            this.getMovies(this.movieAPI.getRecentMoviesURL());
            this.getGenres(this.movieAPI.getGenreURL());
            this.isSearched = false; 
        }
    }   

    getMovies(URL: string) {
        this.spinner.show();
        this.httpRequest = this._http.get<any>(URL)
          .subscribe(data => {
            this.movieArray = [];
            this.totalPages = data.total_pages;

            if (data.page === 1) {
                this.currentPage = data.page;

            } else if (this.currentPage < data.page) {
                this.currentPage++;

            } else {
                this.currentPage--;
            }

            if(!this.isUsingPagination) {
                this.totalMovies = data.total_results;
                data.results.forEach((movie) => {
                    movie.poster_path !== null ? this.movieArray.push(movie) : this.totalMovies--;
                });
            } else {
                data.results.forEach((movie) => {
                    movie.poster_path !== null ? this.movieArray.push(movie) : null;
                });

                if (this.movieArray.length === 0) {
                    data.results.forEach((movie) => {
                        this.movieArray.push(movie);
                    });
                }
            }

            this.formatDescription();
            this.isUsingPagination = false;
            this.isFinishedLoading = true;
            this.prevGenre = this.genreSelect;
            this.spinner.hide();
          }, 
          error =>{
            console.error(error)
          })
    }

    getGenres(URL: string) {
        this.genreSelect = { id: 1, name: "Recent" };
        this.genreArray = [this.genreSelect];

        this._http.get<any>(URL)
        .subscribe(data => {
            this.genreArray = [...this.genreArray, ...data.genres];
            this.prevGenre = this.genreArray[0]; 
        }, 
        error =>{
          console.error(error)
        })
    }

    cancelApiRequest() {
        this.genreSelect = this.prevGenre;
        this.httpRequest.unsubscribe();
        this.spinner.hide();
    }

    changeGenreSelectedOnMouseOver(event) {
        event.target.style.backgroundColor = "rgb(42, 177, 212)";
        event.target.style.color = "white";
        event.target.style.boxShadow = "0 1px 3px 1px rgb(0, 0, 0, 0.25)";
    }

    changeGenreSelectedOnMouseLeave(event) {
        event.target.style.backgroundColor = "white";
        event.target.style.color = "#218da8";
        event.target.style.boxShadow = "0 1px 2px 0 rgb(0, 0, 0, 0.15)";
    }

    applyStylesToGenreSelected() {
        this.showGenres = false;
        this.genreSelectedEl.nativeElement.style.backgroundColor = "white";
        this.genreSelectedEl.nativeElement.style.color = "#218da8";
        this.genreSelectedEl.nativeElement.style.boxShadow = "0 1px 2px 0 rgb(0, 0, 0, 0.15)";
        this.genreSelectedEl.nativeElement.addEventListener("mouseover", this.changeGenreSelectedOnMouseOver);
        this.genreSelectedEl.nativeElement.addEventListener("mouseleave", this.changeGenreSelectedOnMouseLeave);
    }

    formatDescription() {
        for(let i = 0; i < this.movieArray.length; i++) {
            const titleLength = this.movieArray[i].title.length;

            if (titleLength > 49) {
                for(let j = 41; j < this.movieArray[i].title.length; j++) {
                    if(this.movieArray[i].title.charAt(j).match(/ /g)) {
                        this.movieArray[i].title = this.movieArray[i].title.slice(0, j) + '...';
                        break;
                    }
                }
                this.movieArray[i].titleFontSize = '14px';
                    
            } else if (titleLength > 40) {
                this.movieArray[i].titleFontSize = '14px';
                    
            } else if (titleLength > 32) {
                this.movieArray[i].titleFontSize = '15px';
            } 
        }
    }

    formatDate(date) {
        if(date !== undefined) {
            const month = MONTHS[parseInt(date.slice(5,7))-1];
            const day = date.slice(8) > 9 ? date.slice(8) : date.slice(9);
            return month + ' ' + day + ', ' + date.slice(0,4);
        }
    }

    openModal(id: string, movie) {
        this.modalService.open(id, movie, this.genreArray);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    nextPage(isBottom: boolean) {
        if(this.currentPage !== this.totalPages) {
            this.switchPageTo(this.currentPage + 1, isBottom);
        }
    }

    prevPage(isBottom: boolean) {
        if(this.currentPage !== 1) {
            this.switchPageTo(this.currentPage - 1, isBottom);
        }
    }

    switchPageTo(pageNumber: number, isBottomPagination: boolean) {
        this.isUsingPagination = true;

        if(this.isSearched) {
            const searchURL = this.movieAPI.getSearchURL() + this.parameter + '&page=' + (pageNumber);
            this.getMovies(searchURL);

        } else if(this.genreSelect.id === 1) {
            this.getMovies(this.movieAPI.getRecentMoviesURL(pageNumber));

        } else {
            this.getMovies(this.movieAPI.getMoviesURL(this.genreSelect.id, pageNumber));
        }

        if(isBottomPagination) {
            this.scroller.scrollToAnchor('goto-block');
        } else {
            this.scroller.scrollToAnchor('content-wrapper');
        }
    }

    selectGenre(genreSel: Genre){
        this.showGenres = false;
        this.genreSelect = genreSel;
        this.applyStylesToGenreSelected();

        if(genreSel !== undefined && genreSel.id === 1) {
            this.getMovies(this.movieAPI.getRecentMoviesURL());

        } else {
            this.getMovies(this.movieAPI.getMoviesURL(this.genreSelect.id, 1));
        }

        this.isSearched = false; 
    }
 }
