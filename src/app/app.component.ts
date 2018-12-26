import { Component, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestsService } from './requests.service';
import { UserService } from './user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChild('genericModal') genericModal: ElementRef;
	@ViewChild('removeModal') removeModal: ElementRef;

	constructor(
		private modalService: BsModalService,
		private router: Router,
		private requests: RequestsService,
		private userService: UserService,
		private activatedRoute: ActivatedRoute,
	) { }


	modalRef: BsModalRef;
	openModal(template) {
		this.modalRef = this.modalService.show(template, { class: 'modal-md' });
	}

	isLoginComponent() {
		let currentPath = location.pathname.replace('/', '')
		if (currentPath == '' || currentPath == 'login') {
			return true
		}
		return false
	}

	goToDashboard() {
		this.modalRef.hide()
		this.router.navigate(['/home'])
	}

	goToLogin() {
		this.modalRef.hide()
		this.router.navigate(['/'])
	}

	p = "";
	h = "";
	name = "";
	openGenericModal(paragraph, header, name) {
		this.p = paragraph;
		this.h = header;
		this.name = name;
		this.openModal(this.genericModal);

	}

	pRemove = "";
	hRemove = "";
	nameRemove = "";
	openRemoveModal(paragraph, header, name) {
		this.pRemove = paragraph;
		this.hRemove = header;
		this.nameRemove = name;
		this.openModal(this.removeModal);
	}

	remove(name) {
		if (name == 'user') { //remove user
			this.modalRef.hide();
			this.openGenericModal('Usuário removido com sucesso!', 'Parabéns!', 'simple')
			window.location.reload(true);
		} else if (name == 'super-user') { //remove super-user
			this.modalRef.hide();
			this.openGenericModal('Super usuário removido com sucesso!', 'Parabéns!', 'simple')
			window.location.reload(true);
		}
	}

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	logOut() {
		this.requests.logout().subscribe(
			response => {

			},
			err => {
				console.log(err)
			},
			() => {

			}

		)
		this.router.navigate(['/']);
	}
}
