import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequestsService } from '../requests.service';


@Injectable({
	providedIn: 'root'
})
export class GuardService implements CanActivate {

	constructor(
		private router: Router,
		private requests: RequestsService
	) { }

	isAuthorized = true;
	canActivate() {
		this.requests.isLogged().subscribe(
			response => {
				this.isAuthorized = response['response']
			},
			err => {
				console.log(err)
			},
			() => {
				if (!this.isAuthorized) this.router.navigate(['/'])
			}
		)
		return this.isAuthorized

	}
}

