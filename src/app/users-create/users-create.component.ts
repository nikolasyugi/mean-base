import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';

@Component({
	selector: 'app-users-create',
	templateUrl: './users-create.component.html',
	styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

	constructor(
		private app: AppComponent,
		private requests: RequestsService
	) { }

	ngOnInit() {
		window.scrollTo(0, 0);
		this.loading = false;
	}

	loading: boolean;
	loading_submit: boolean;
	name: string;
	email: string;
	password: string;
	confirm_password: string;

	createUser() {
		this.app.openGenericModal('Usuário criado com sucesso!', 'Parabéns!', 'simple')
		this.loading_submit = false;
	}
}
