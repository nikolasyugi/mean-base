import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	isLoginComponent() {
		let currentPath = location.pathname.replace('/', '')
		if (currentPath == '' || currentPath == 'login') {
			return true
		}
		return false
	}

}
