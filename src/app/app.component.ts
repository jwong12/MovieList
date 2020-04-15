import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})

export class AppComponent {
    searchKeywords: string;

    constructor(private router: Router) {}

    searchOnKeyPress(e: KeyboardEvent) {
        if(e.key === "Enter") {
            this.searchOnClick();
        }        
    }

    searchOnClick() {
        if(this.searchKeywords !== undefined && this.searchKeywords.trim() !== '') {
            this.router.navigate(['/results', this.searchKeywords.trim()]);
        } 
    }
}
