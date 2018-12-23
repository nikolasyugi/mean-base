import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-side',
	templateUrl: './side.component.html',
	styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		if (location.pathname.split('/').length > 2) {
			this.userClicked = true;
		}
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
