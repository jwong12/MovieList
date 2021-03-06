import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';

@Component({
    templateUrl: 'app.results.html',
    styleUrls: ['app.results.scss'],
    providers: []
})

export class ResultsComponent implements OnInit { 
    query: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.query = params['search'];
        });
    }
}
