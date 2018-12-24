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

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

}
