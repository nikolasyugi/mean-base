import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';

@Component({
	selector: 'app-edit-password',
	templateUrl: './edit-password.component.html',
	styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
	constructor(
		private app: AppComponent,
		private requests: RequestsService,
	) { }

	ngOnInit() {
		this.loading = false;
		window.scrollTo(0, 0)
	}

	loading: boolean;
	loading_submit: boolean;
	last_password: string;
	password: string;
	confirm_password: string;

	updatePassword() {
		this.app.openGenericModal('Senha alterada com sucesso!', 'Parabéns!', 'simple')
		this.loading_submit = false;
	}
}
