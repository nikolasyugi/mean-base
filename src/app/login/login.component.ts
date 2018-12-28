import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		private userService: UserService,
		private router: Router,
		private app: AppComponent
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
				if (err.error.err) this.app.openGenericModal(err.error.err, 'Ops!', 'simple')
				else if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
				else console.log(err)
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
