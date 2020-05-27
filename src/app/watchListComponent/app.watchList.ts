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

    constructor(private api: APIService) { }

    async ngOnInit() {
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(async user => {
            console.log(user);
            this.userAuthenticated = true;
            console.log(this.userAuthenticated);
            // this.userId = user.attributes.sub;
            // this.userName = user.username;

        }).catch(err => {
            console.log("err: " + err);
            console.log(this.userAuthenticated);
        });

        this.listMovies();
    }

    async listMovies() {
        await this.api.ListMovies()
        .then(result => this.allMovies = result.items)
        .catch(err => console.log(err));
        // console.log("result: " + result);
    }
}
