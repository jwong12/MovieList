import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Hub } from 'aws-amplify';

@Component({
	selector: 'app-account-component',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	userAuthenticated: boolean = false;
	username: string;
	userEmail: string;
	userPhone: string;
	subjectSelect: any;
	toggleUnavailableTextbox: boolean = false;
	toggleTicketSystem: boolean = false;
	isTicketSubmitted: boolean = false;
	submissionSuccess: string;
	submissionFail: string;
	ticketItems: Array<string> = ["--Please choose an option--", "Account", "Plan details", "Website", "Technical issues", "Other"];
	selectedTicket: string;

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

		this.selectedTicket = this.ticketItems[0];
	}

	formatPhoneNum(phone) {
		return '(' + phone.substring(2, 5) + ') ' + phone.substring(5, 8) + '-' + phone.substring(8);
	} 

	openUnavailableTextbox() {
		this.toggleUnavailableTextbox = true;
	}

	closeUnavailableTextbox() {
		this.toggleUnavailableTextbox = false;
	}

	openTicket() {
		this.toggleTicketSystem = true;
	}

	closeTicket() {
		this.toggleTicketSystem = false;
	}

	submitTicket(ticketDescription) {
		this.isTicketSubmitted = true;

		if(this.selectedTicket === this.ticketItems[0]) {
			this.submissionFail = "Please select a subject for your ticket.";
			this.submissionSuccess = null;

		} else if (ticketDescription.value.trim() === "") {
			this.submissionFail = "Please include a description for your ticket.";
			this.submissionSuccess = null;

		} else {
			this.submissionSuccess = "Your ticket has been submitted.";
			this.submissionFail = null;
		}
	}

	handleSelectChange() {
		this.isTicketSubmitted = false;
	}
}
