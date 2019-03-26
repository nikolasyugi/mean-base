import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-users-update',
	templateUrl: './users-update.component.html',
	styleUrls: ['./users-update.component.css']
})
export class UsersUpdateComponent implements OnInit {

	constructor(
		private app: AppComponent,
		private requests: RequestsService,
		private location: Location,
		private router: Router
	) { }

	ngOnInit() {
		this.loading = true;
		window.scrollTo(0, 0)
		if (this.location.path().split('/users/common/update/')[1]) {
			this.id = this.location.path().split('/users/common/update/')[1]
			this.getUser();
		} else {
			this.router.navigate(['/users/common'])
		}
	}

	loading: boolean;
	loading_submit: boolean;
	id: string;
	user: any;

	getUser() {
		this.requests.getUser(this.id).subscribe(
			response => {
				this.user = response;
			},
			err => {
				console.log(err)
			},
			() => {
				setTimeout(() => {
					this.loading = false
				}, 1000);
			}
		)
	}
	updateUser() {
		this.loading_submit = true;

		this.requests.updateUser(this.id, this.user).subscribe(
			response => {
			},
			err => {
				if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
				else console.log(err)
			},
			() => {
				this.router.navigate(['/users/common'])
				this.loading_submit = false;
				this.app.openGenericModal('Usuário alterado com sucesso!', 'Parabéns!', 'simple')
			}
		)
	}
}
