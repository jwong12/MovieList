import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { MovieURLService } from '../apiService/app.movieURLService';

@Component({
    templateUrl: 'app.results.html',
    styleUrls: ['app.results.scss'],
    providers: [MovieURLService]
})

export class ResultsComponent implements OnInit { 
    keyword: string;

    constructor(private route: ActivatedRoute, private movieAPI: MovieURLService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.keyword = params['search'].toUpperCase();
            let param = '';

            [...params.search].forEach(char => {
                if(char === ' ') {
                    param += '-'
                } else {
                    param += char;
                }
            });
            let searchURL = this.movieAPI.getSearchURL() + param;
            console.log(searchURL);
            console.log(this.keyword);
        });
    }
}
