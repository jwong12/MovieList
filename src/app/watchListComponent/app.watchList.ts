import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { APIService } from '../API.service';

@Component({
    templateUrl: 'app.watchList.html',
    styleUrls: ['app.watchList.scss'],
    providers: []
})

export class WatchListComponent implements OnInit { 
    allMovies:any = [];
    userAuthenticated:boolean = false;
    isDbTableEmpty: boolean = false;

    constructor(private api: APIService) { }

    async ngOnInit() {
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(async user => this.userAuthenticated = true)
        .catch(err => console.log(err));

        this.listMovies();
    }

    async listMovies() {
        await this.api.ListMovies()
        .then(result => {
            this.allMovies = result.items;

            if(this.allMovies.length === 0) {
                this.isDbTableEmpty = true;
                
            } else {
                this.isDbTableEmpty = false;
            }
        })
        .catch(err => console.log(err));
    }
}
