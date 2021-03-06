﻿import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
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
    innerWidth: any;
    imgSrc: string; 
    imgSrcLow: string;
    title: string;
    year: number;
    genres: string = "";
    userRating: number;
    hideCircleProgress: boolean;
    popularity: number;
    overview: string;
    userAuthenticated:boolean = false;
    movieIsInDB: boolean;
    imageLoaded: boolean = false;
    receiveMovieFromApi: boolean = false;
    isModalCancelled: boolean = false;

    @Input() id: string;
    private element: any;

    @ViewChild('modalBody', {static: false}) 
    modalBodyEl: ElementRef; 

    @ViewChild('modalBackground', {static: false}) 
    modalBackgroundEl: ElementRef; 

    @ViewChild('saveButton', {static: false}) 
    saveButtonEl: ElementRef; 
    
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }

    constructor(private router: Router, private modalService: ModalService, private el: ElementRef, private api:APIService, private spinner: NgxSpinnerService) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;

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
        this.isModalCancelled = false;
        this.element.style.display = 'block';
        this.modalBodyEl.nativeElement.style.display = 'none';
        this.modalBackgroundEl.nativeElement.style.display = 'none';
        this.spinner.show();
        document.body.classList.add('jw-modal-open');
        this.imgSrc = posterLink + movie.poster_path;
        this.imgSrcLow = posterLinkLow + movie.poster_path;
        this.title = movie.title;
        this.year = parseInt(movie.release_date.slice(0, 4));
        this.genres = this.getGenre(movie.genre_ids, genreArray);
        this.userRating = movie.vote_average * 10;
        this.hideCircleProgress = (this.userRating === 0 ? true : false);
        const num = Math.round(movie.popularity / 10);
        this.popularity = (num > 100 ? 100 : num);
        let text = movie.overview === "" ? "Unavailable" : movie.overview;

        if (this.innerWidth < 500) {
            text = this.parseOverviewText(text, 275);

        } else if (this.innerWidth < 585) {
            text = this.parseOverviewText(text, 375);
        } 

        this.overview = text;

        if (this.userAuthenticated) {
            this.isMovieInDB();
        }
    }

    parseOverviewText(text, charCount) {
        while (text.length > charCount) {
            text = text.slice(0, -1);
            const lastPunctuation = (text.lastIndexOf(".") > text.lastIndexOf("?") ? text.lastIndexOf(".") : text.lastIndexOf("?"));

            if (lastPunctuation === -1) {
                text = text.slice(0, charCount-5);
                text = text.slice(0, text.lastIndexOf(' ')) + '...';
                break;
            }
            text = text.slice(0, lastPunctuation+1); 
        }

        return text;
    }

    async isMovieInDB() {
        await this.api.GetMovie(this.title).then((result) => {
            if (!this.isModalCancelled) {
                if (result && result.title === this.title) {
                    this.movieIsInDB = true;
                    this.setAddedButton();
    
                } else {
                    this.movieIsInDB = false;
                    this.setSaveButton();
                }

                if (this.imageLoaded) {
                    this.spinner.hide();
                    this.modalBackgroundEl.nativeElement.style.display = 'initial';
                    this.modalBodyEl.nativeElement.style.display = 'flex';
                }
    
                this.receiveMovieFromApi = true;
            } else {
                this.receiveMovieFromApi = false;
            }
        }).catch(() => {});  
    }

    isImageLoaded() {
        if (this.receiveMovieFromApi || !this.userAuthenticated) {
            this.spinner.hide();
            this.modalBackgroundEl.nativeElement.style.display = 'initial';
            this.modalBodyEl.nativeElement.style.display = 'flex';
        }

        this.imageLoaded = true;
    }

    cancelModal() {
        this.isModalCancelled = true;
        this.spinner.hide();
        this.close();
    }

    setSaveButton() {
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
        if (!this.userAuthenticated) {
            this.close();
            this.router.navigate(['/account']);

        } else if(this.movieIsInDB) {
            this.movieIsInDB = false;
            this.setSaveButton();

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

        for (let i = 0; i < genreId.length; i++) {
            for (let j = 0; j < genreArray.length; j++) {
                if (genreArray[j].id === genreId[i]) {
                    if (genres === '') {
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
        this.userRating = 0;
        this.popularity = 0;
        
        if(this.saveButtonEl) {
            this.saveButtonEl.nativeElement.textContent = "Save";
            this.saveButtonEl.nativeElement.style.backgroundColor = "rgba(204, 127, 46, 0.93)";
            this.saveButtonEl.nativeElement.style.border = "solid 1px rgba(204, 127, 46, 0.93)";
            this.saveButtonEl.nativeElement.style.color = "#fbfbfb";
            this.saveButtonEl.nativeElement.style.cursor = "pointer";
        }
    }
}