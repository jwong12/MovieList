import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from "@angular/router"
import { ModalService } from './modal.service';
import { APIService } from '../API.service';
import { Auth } from 'aws-amplify';
import { NgxSpinnerService } from "ngx-spinner";

const posterLink = "https://image.tmdb.org/t/p/w440_and_h660_face";
const posterLinkLow = "https://image.tmdb.org/t/p/w220_and_h330_face";

@Component({ 
    selector: 'jw-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.less'],
    encapsulation: ViewEncapsulation.None
})

export class ModalComponent implements OnInit, OnDestroy {
    imgSrc: string; 
    imgSrcLow: string;
    title: string;
    year: number;
    genres: string;
    userRating: number;
    popularity: number;
    overview: string;
    userAuthenticated:boolean = false;
    movieIsInDB: boolean;
    imageLoaded: boolean = false;
    receiveMovieFromApi: boolean = false;

    @Input() id: string;
    private element: any;

    @ViewChild('modalBody', {static: false}) 
    modalBodyEl: ElementRef; 

    @ViewChild('saveButton', {static: false}) 
    saveButtonEl: ElementRef; 
    
    constructor(private router: Router, private modalService: ModalService, private el: ElementRef, private api:APIService, private spinner: NgxSpinnerService) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', el => {
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);

        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(() => this.userAuthenticated = true).catch(err => console.log(err));
    }
    
    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(movie, genreArray): void {
        this.element.style.display = 'block';
        this.modalBodyEl.nativeElement.style.display = 'none';
        this.spinner.show();
        document.body.classList.add('jw-modal-open');
        this.imgSrc = posterLink + movie.poster_path;
        this.imgSrcLow = posterLinkLow + movie.poster_path;
        this.title = movie.title;
        this.year = parseInt(movie.release_date.slice(0, 4));
        this.genres = this.getGenre(movie.genre_ids, genreArray);
        this.userRating = movie.vote_average * 10;
        this.popularity = Math.round(movie.popularity);
        this.overview = movie.overview === "" ? "Unavailable" : movie.overview;
        this.isMovieInDB();
    }

    async isMovieInDB() {
        await this.api.GetMovie(this.title).then((result) => {
            if(result) {
                this.movieIsInDB = true;
                this.setAddedButton();

            } else {
                this.movieIsInDB = false;
                this.setsaveButtonEl();
            }

            if (this.imageLoaded) {
                this.spinner.hide();
            }

            this.receiveMovieFromApi = true;

        }).catch(() => {});  
    }

    isImageLoaded() {
        if (this.receiveMovieFromApi) {
            this.spinner.hide();
        }

        this.imageLoaded = true;
        this.modalBodyEl.nativeElement.style.display = 'flex';
    }

    cancelModal() {
        this.spinner.hide();
        this.close();
    }

    setsaveButtonEl() {
        this.saveButtonEl.nativeElement.textContent = "Save";
        this.saveButtonEl.nativeElement.style.backgroundColor = "rgba(204, 127, 46, 0.93)";
        this.saveButtonEl.nativeElement.style.border = "solid 1px rgba(204, 127, 46, 0.93)";
        this.saveButtonEl.nativeElement.style.color = "#fbfbfb";
    }

    setAddedButton() {
        this.saveButtonEl.nativeElement.textContent = "Added";
        this.saveButtonEl.nativeElement.style.backgroundColor = "rgba(130, 130, 130, 0.93)";
        this.saveButtonEl.nativeElement.style.border = "solid 1px rgba(130, 130, 130, 0.93)";
        this.saveButtonEl.nativeElement.style.color = "#ffffff";
    }

    async addToWatchList() {
        if(!this.userAuthenticated) {
            this.close();
            this.router.navigate(['/account']);

        } else if(this.movieIsInDB) {
            this.movieIsInDB = false;
            this.setsaveButtonEl();

            const movie = {
                id: this.title
            }

            await this.api.DeleteMovie(movie).catch(err => console.log(err));    

        } else {
            this.movieIsInDB = true;
            this.setAddedButton();

            const movie = {
                id: this.title,
                title: this.title,
                year: this.year,
                genres: this.genres,
                rating: this.userRating,
                popularity: this.popularity,
                overview: this.overview,
                poster: this.imgSrcLow
            }

            await this.api.CreateMovie(movie).catch(err => console.log(err));
        }   
    }

    getGenre(genreId, genreArray) {
        let genres = '';

        for(let i = 0; i < genreId.length; i++) {
            for(let j = 0; j < genreArray.length; j++) {
                if(genreArray[j].id === genreId[i]) {
                    if(genres === '') {
                        genres += genreArray[j].name
                    } else {
                        genres += ', ' + genreArray[j].name
                    }
                    break;
                }
            }
        }
        return genres;
    } 

    // close modal
    close(): void {
        this.imgSrc = null;
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
        this.imageLoaded = false;
        this.receiveMovieFromApi = false;

        if(this.saveButtonEl) {
            this.saveButtonEl.nativeElement.textContent = "Save";
            this.saveButtonEl.nativeElement.style.backgroundColor = "rgba(204, 127, 46, 0.93)";
            this.saveButtonEl.nativeElement.style.border = "solid 1px rgba(204, 127, 46, 0.93)";
            this.saveButtonEl.nativeElement.style.color = "#fbfbfb";
            this.saveButtonEl.nativeElement.style.cursor = "pointer";
        }
    }
}