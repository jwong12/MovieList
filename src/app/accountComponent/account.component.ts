import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Hub } from 'aws-amplify';

@Component({
	selector: 'app-account-component',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	userAuthenticated:boolean = false;
	username: string;
	userEmail: string;
	userPhone: string;

	constructor() { 
		Hub.listen('auth', (data) => {
			const { payload } = data;

			if(payload.event === "signIn") {
				this.userAuthenticated = true;
				this.username = payload.data.username;
				this.userEmail = payload.data.attributes.email;
				this.userPhone = this.formatPhoneNum(payload.data.attributes.phone_number);

			} else if(payload.event === "signOut") {
				this.userAuthenticated = false;
			}
        })
	}

	ngOnInit() {
		Auth.currentAuthenticatedUser({
			bypassCache: false
			
		}).then(async user => {
			this.username = user.username;
			this.userAuthenticated = true;
			this.userEmail = user.attributes.email;
			this.userPhone = this.formatPhoneNum(user.attributes.phone_number);

		}).catch(err => {
			console.log(err);
		});
	}

	formatPhoneNum(phone) {
		return '(' + phone.substring(2, 5) + ') ' + phone.substring(5, 8) + '-' + phone.substring(8);
	} 

}
