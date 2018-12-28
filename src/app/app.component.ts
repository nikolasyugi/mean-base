import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, NavigationEnd } from '@angular/router';
import { RequestsService } from './requests.service';
import { UserService } from './user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	@ViewChild('genericModal') genericModal: ElementRef;
	@ViewChild('removeModal') removeModal: ElementRef;

	constructor(
		private modalService: BsModalService,
		private router: Router,
		private requests: RequestsService,
		private userService: UserService
	) { }


	ngOnInit() {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};

		this.router.events.subscribe((evt) => {
			if (evt instanceof NavigationEnd) {
				this.router.navigated = false;
				window.scrollTo(0, 0);
			}
		});
	}

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

	logOut() {
		this.userService.logout().subscribe(
			response => {
			},
			err => {
				console.log(err)
			},
			() => {
				this.router.navigate(['/']);
			}
		)
	}
}
