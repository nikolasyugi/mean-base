import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-password',
	templateUrl: './edit-password.component.html',
	styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
	constructor(
		private app: AppComponent,
		private userService: UserService,
		private router: Router
	) { }

	ngOnInit() {
		this.loading = false;
		window.scrollTo(0, 0)
	}

	loading: boolean;
	loading_submit: boolean;
	oldPassword: string;
	password: string;
	confirm_password: string;

	updatePassword() {
		if (this.oldPassword && this.password && this.confirm_password) {
			let body = {
				oldPassword: this.oldPassword,
				password: this.password,
				confirm_password: this.confirm_password
			}
			this.userService.changePassword(body).subscribe(
				response => {
				},
				err => {
					if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
					console.log(err)
					this.loading_submit = false;
				},
				() => {
					this.router.navigate(['/home']);
					this.loading_submit = false;
					this.app.openGenericModal('Senha alterada com sucesso!', 'Parabéns!', 'simple')
				}
			)
		} else {
			this.app.openGenericModal('Preencha todos os campos', 'Ops!', 'simple')
		}
	}
}
