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
		this.loading = false;
		window.scrollTo(0, 0)
		if (this.location.path().split('/users/common/update/')[1]) {
			this.id = this.location.path().split('/users/common/update/')[1]
		} else {
			this.router.navigate(['/users/common'])
		}
	}

	loading: boolean;
	loading_submit: boolean;
	name: string;
	email: string;
	password: string;
	confirm_password: string;
	id: string;

	updateUser() {
		this.app.openGenericModal('Usuário alterado com sucesso!', 'Parabéns!', 'simple')
		this.loading_submit = false;
	}
}
