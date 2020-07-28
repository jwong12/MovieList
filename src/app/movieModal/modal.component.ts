import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router"
import { ModalService } from './modal.service';
import { APIService } from '../API.service';
import { Auth } from 'aws-amplify';

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
    saveButton: HTMLElement;
    userAuthenticated:boolean = false;

    @Input() id: string;
    private element: any;

    constructor(private router: Router, private modalService: ModalService, private el: ElementRef, private api:APIService) {
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
        }).then(() => this.userAuthenticated = true)
        .catch(err => console.log(err));
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(movie, genreArray): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
        this.imgSrc = posterLink + movie.poster_path;
        this.imgSrcLow = posterLinkLow + movie.poster_path;
        this.title = movie.title;
        this.year = parseInt(movie.release_date.slice(0, 4));
        this.genres = this.getGenre(movie.genre_ids, genreArray);
        this.userRating = movie.vote_average * 10;
        this.popularity = Math.round(movie.popularity);
        this.overview = movie.overview === "" ? "Unavailable" : movie.overview;
    }

    async addToWatchList(spanHTML) {
        if(this.userAuthenticated && spanHTML.textContent !== "Added!") {
            spanHTML.textContent = "Added!";
            spanHTML.style.backgroundColor = "rgba(130, 130, 130, 0.93)";
            spanHTML.style.border = "solid 1px rgba(130, 130, 130, 0.93)";
            spanHTML.style.color = "#ffffff";
            spanHTML.style.cursor = "initial";
            this.saveButton = spanHTML;

            const movie = {
                title: this.title,
                year: this.year,
                genres: this.genres,
                rating: this.userRating,
                popularity: this.popularity,
                overview: this.overview,
                poster: this.imgSrcLow
            }

            await this.api.CreateMovie(movie).catch(err => console.log("User needs to sign in."));

        } else if(!this.userAuthenticated) {
            this.close();
            this.router.navigate(['/account']);
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
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');

        if(this.saveButton) {
            this.saveButton.textContent = "Save";
            this.saveButton.style.backgroundColor = "rgba(204, 127, 46, 0.93)";
            this.saveButton.style.border = "solid 1px rgba(204, 127, 46, 0.93)";
            this.saveButton.style.color = "#fbfbfb";
            this.saveButton.style.cursor = "pointer";
        }
    }
}