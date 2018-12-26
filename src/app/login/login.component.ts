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
		window.scrollTo(0, 0);
	}

	loading = false;
	email;
	password;
	user;
	login() {
		this.loading = true;
		this.requests.sign_in(this.email, this.password).subscribe(
			response => {
				this.user = response;
				localStorage.setItem('user', JSON.stringify(this.user));
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
