import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-side',
	templateUrl: './side.component.html',
	styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

	constructor(
		private app: AppComponent,
		private router: Router
	) { }

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'))
		if (!this.user) this.router.navigate(['/'])
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
