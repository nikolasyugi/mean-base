import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		private userService: UserService,
		private router: Router
	) { }

	ngOnInit() {
		window.scrollTo(0, 0);
		localStorage.clear();
	}

	loading = false;
	email;
	password;
	user;
	login() {
		this.loading = true;
		this.userService.sign_in(this.email, this.password).subscribe(
			response => {
				this.user = response;
			},
			err => {
				console.log(err)
				this.loading = false;
			},
			() => {
				localStorage.setItem('user', JSON.stringify(this.user));
				this.router.navigate(['/home'])
				this.loading = false;
			}
		)
	}
}
