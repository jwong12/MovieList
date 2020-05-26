import { Component, OnInit } from '@angular/core';
import { APIService } from '../API.service';

@Component({
    templateUrl: 'app.watchList.html',
    styleUrls: ['app.watchList.scss'],
    providers: []
})

export class WatchListComponent implements OnInit { 
    allMovies:any = [];

    constructor(private api: APIService) { }

    async ngOnInit() {
        this.listMovies();
    }

    async listMovies() {
        let result = await this.api.ListMovies()
        this.allMovies = result.items;
    }
}
