import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { APIService } from '../API.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    templateUrl: 'app.watchList.html',
    styleUrls: ['app.watchList.scss'],
    providers: []
})

export class WatchListComponent implements OnInit { 
    allMovies:any = [];
    userAuthenticated:boolean = false;
    isDbTableEmpty: boolean = false;

    constructor(private api: APIService, private spinner: NgxSpinnerService) { }

    async ngOnInit() {
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(async () => this.userAuthenticated = true)
        .catch(err => console.log(err));

        this.listMovies();
    }

    async removeFromWatchList(movie) {
        const movieObj = {
            id: movie.id
        }

        await this.api.DeleteMovie(movieObj).then(() => this.ngOnInit()).catch(err => console.log(err));
    }

    async listMovies() {
        this.spinner.show();

        await this.api.ListMovies()
        .then(result => {
            this.allMovies = result.items;

            if(this.allMovies.length === 0) {
                this.isDbTableEmpty = true;
                
            } else {
                this.isDbTableEmpty = false;
            }

            this.spinner.hide();
        })
        .catch(err => {
            console.log(err);
            this.spinner.hide();
        });
    }
}
