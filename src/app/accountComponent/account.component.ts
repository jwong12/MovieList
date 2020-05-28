import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
	selector: 'app-account-component',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	userAuthenticated:boolean = false;
	userEmail: string;
	userPhone: string;

	constructor() { }

	ngOnInit() {
		Auth.currentAuthenticatedUser({
			bypassCache: false
		}).then(async user => {
			console.log(user); //
			this.userAuthenticated = true;
			this.userEmail = user.attributes.email;
			this.userPhone = this.formatPhoneNum(user.attributes.phone_number);

		}).catch(err => {
			console.log("err: " + err); //
		});
	}

	formatPhoneNum(phone) {
		return '(' + phone.substring(2, 5) + ') ' + phone.substring(5, 8) + '-' + phone.substring(8);
	} 

}
