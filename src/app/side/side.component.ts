import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { GuardService } from '../guard/guard.service';

@Component({
	selector: 'app-side',
	templateUrl: './side.component.html',
	styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

	constructor(
		private app: AppComponent,
		private router: Router,
		private auth: GuardService

	) { }

	ngOnInit() {
		this.auth.canActivate()

		this.user = JSON.parse(localStorage.getItem('user'))
		if (location.pathname.split('/').length > 2) {
			this.userClicked = true;
		}
		window.addEventListener("resize", function () {
			return window.innerWidth;
		});
	}

	user: any;
	openLogout() {
		this.dropdownOpen = false;
		this.mobileOpen = false;
		this.app.openGenericModal('Tem certeza que deseja sair?', 'Atenção!', 'logout');
	}

	closeAll() {
		this.userClicked = false;
	}

	dropdownOpen: boolean = false;
	mobileOpen: boolean = false;

	subMenus: boolean = false;
	userClicked: boolean = false;

	isMobile: boolean = false
	menuMobile() {
		if (window.innerWidth < 1170) {
			this.isMobile = true
			return this.isMobile
		} else {
			this.isMobile = false
			return this.isMobile
		}
	}

	getPathClassMenu(path: String) {

		let currentPath = location.pathname.split('/')
		if (currentPath[1] == path) {
			return 'active-menu'
		} else {
			return ''
		}
	}

	getPathClassSubMenu(path: String) {

		let currentPath = location.pathname.split('/')
		if (currentPath[2] == path) {
			return 'active-menu'
		} else {
			return ''
		}
	}

}
