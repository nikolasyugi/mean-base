import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-users-create',
	templateUrl: './users-create.component.html',
	styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

	constructor(
		private app: AppComponent,
		private requests: RequestsService,
		private router: Router
	) { }

	ngOnInit() {
		window.scrollTo(0, 0);
	}

	loading_submit: boolean;
	name: string;
	email: string;
	password: string;
	confirm_password: string;

	createUser() {
		this.loading_submit = true;
		let user = {
			name: this.name,
			email: this.email,
			password: this.password,
			confirm_password: this.password
		}
		this.requests.createUser(user).subscribe(
			response => {
			},
			err => {
				if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
				else console.log(err)
			},
			() => {
				this.router.navigate(['/users/common'])
				this.loading_submit = false;
				this.app.openGenericModal('Usuário criado com sucesso!', 'Parabéns!', 'simple')
			}
		)
	}
}
