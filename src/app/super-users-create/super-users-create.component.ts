import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';

@Component({
	selector: 'app-super-users-create',
	templateUrl: './super-users-create.component.html',
	styleUrls: ['./super-users-create.component.css']
})
export class SuperUsersCreateComponent implements OnInit {

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

	createSuperUser() {
		this.app.openGenericModal('Super usuário criado com sucesso!', 'Parabéns!', 'simple')
		this.loading_submit = false;
	}
}
