import { Component, ElementRef, Renderer2, HostListener, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MovieURLService } from './apiService/app.movieURLService';
import { Subject, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap  } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    providers: [MovieURLService]
})

export class AppComponent {
    searchKeywords: string;
    suggestions: Array<string>;
    subject = new Subject<string>();
    @ViewChild('searchWrapper', { read: ElementRef, static: false }) searchWrapperEl:ElementRef;

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.searchWrapperEl.nativeElement.contains(event.target)) {
            this.closeSuggestions();
        }
    }
    
    constructor(private router: Router, private _http: HttpClient, private movieAPI: MovieURLService, private rd: Renderer2) {
        this.searchKeywords = '';
        this.suggestions = [];
        this.subject.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(val => { 
                this.getSuggestions(val);
                return EMPTY;
            })
        ).subscribe();
    }

    ngOnDestroy() {
        if (this.subject) {
            this.subject.unsubscribe();
        }
    }

    getSuggestions(text) {
        const query = text.trim().replace(/ /g, '%20');

        if (query.length > 1) {
            this.suggestions = [];
            this._http.get<any>(this.movieAPI.getSuggestionURL(query))
                .subscribe(data => {
                    let count = 0;
                    data.results.forEach((movie) => {
                        if (count++ < 10) {
                            this.suggestions.push(movie.original_title);
                        }
                    });
                }, 
                error =>{
                    console.error(error);
                })
        } else {
            this.closeSuggestions();
        }
    }

    openSuggestions(text) {
        this.getSuggestions(text);
    }

    closeSuggestions() {
        this.suggestions = [];
    }

    handleClickSuggestion(title) {
        this.router.navigate(['/results', title]);
        this.searchKeywords = '';
        this.suggestions = [];
    }

    handleKeywordChange() {
        this.subject.next(this.searchKeywords);
    }

    searchOnKeyPress(e: KeyboardEvent) {
        if (e.key === "Enter") {
            this.searchOnClick();
        } 
    }

    searchOnClick() {
        if(this.searchKeywords !== undefined && this.searchKeywords.trim() !== '') {
            let keyword = this.searchKeywords.trim();
            this.router.navigate(['/results', keyword]);
            this.searchKeywords = '';
            this.suggestions = [];
        } 
    }

    openNav() {
        const links = document.getElementById("hidden-links") as HTMLElement;
        links.style.display = (links.style.display === "block" ? "none" : "block");
    }

    closeNav() {
        const links = document.getElementById("hidden-links") as HTMLElement;
        links.style.display = "none";
    }

    onResize(event: any) {
        if(event.target.innerWidth > 817) {
            const links = document.getElementById("hidden-links") as HTMLElement;
            links.style.display = "none";
        }
    }
}
