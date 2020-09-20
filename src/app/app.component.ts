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
            let keyword = this.searchKeywords.trim();
            this.router.navigate(['/results', keyword]);
            this.searchKeywords = '';
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
