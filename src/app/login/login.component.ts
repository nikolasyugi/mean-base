import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		private userService: UserService,
		private router: Router,
		private app: AppComponent,
		private modalService: BsModalService,
	) { }

	ngOnInit() {
		window.scrollTo(0, 0);
		localStorage.clear();
	}

    modalRef: BsModalRef;
	openModal(template) {
		this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    }
    
	loading = false;
	loading_forgot = false;
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
    
    forgotPassword() {
        this.loading_forgot = true;
		this.userService.forgotPassword(this.email).subscribe(
			response => {
			},
			err => {
                this.modalRef.hide();
				if (err.error.err) this.app.openGenericModal(err.error.err, 'Ops!', 'simple')
				else if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
				else console.log(err)
				this.loading_forgot = false;
			},
			() => {
                this.email = ''
                this.modalRef.hide();
                this.app.openGenericModal('Um e-mail foi enviado a você com as instruções para recuperação da sua senha', 'E-mail enviado com sucesso!', 'simple')
				this.loading_forgot = false;
			}
		)
    }
}
