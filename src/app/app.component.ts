import { Component } from '@angular/core';
  
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})

export class AppComponent {
    searchKeywords: string;

    search() {
        console.log(this.searchKeywords.trim());
    }
}
