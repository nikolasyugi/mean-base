import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		private requests: RequestsService
	) { }

	ngOnInit() {
	}

	loading = false;
	email;
	password;
	user;
	login() {
		this.loading = true;
		this.requests.teste().subscribe(
			response => {
				this.user = response;
				alert(this.user.name)
			},
			err => {
				console.log(err)
				this.loading = false;
			},
			() => {
				this.loading = false;
			}
		)
	}
}
