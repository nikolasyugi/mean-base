import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-super-users-create',
	templateUrl: './super-users-create.component.html',
	styleUrls: ['./super-users-create.component.css']
})
export class SuperUsersCreateComponent implements OnInit {

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

	createSuperUser() {
		this.loading_submit = true;
		let user = {
			name: this.name,
			email: this.email,
			password: this.password,
			confirm_password: this.password
		}
		this.requests.createSuperUser(user).subscribe(
			response => {
			},
			err => {
				if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
				else console.log(err)
			},
			() => {
				this.router.navigate(['/users/super_users'])
				this.loading_submit = false;
				this.app.openGenericModal('Super usuário criado com sucesso!', 'Parabéns!', 'simple')
			}
		)
	}
}
