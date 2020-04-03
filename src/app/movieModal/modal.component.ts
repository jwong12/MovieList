import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';

const posterLink = "https://image.tmdb.org/t/p/original/";

@Component({ 
    selector: 'jw-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    imgSrc: String; 
    title: String;
    year: Number;
    genres: String;
    userScore: Number;
    popularity: Number;
    overview: String;

    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
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
        // console.log(movie);
        this.imgSrc = posterLink + movie.poster_path;
        this.title = movie.title;
        this.year = parseInt(movie.release_date.slice(0, 4));
        this.genres = this.getGenre(movie.genre_ids, genreArray);
        this.userScore = movie.vote_average;
        this.popularity = movie.popularity;
        this.overview = movie.overview;
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
    }
}