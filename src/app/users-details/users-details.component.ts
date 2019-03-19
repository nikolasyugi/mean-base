import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-users-details',
	templateUrl: './users-details.component.html',
	styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

	constructor(
		private app: AppComponent,
		private requests: RequestsService,
		private location: Location,
		private router: Router
	) { }

	ngOnInit() {
		this.loading = true;
		window.scrollTo(0, 0)
		if (this.location.path().split('/users/common/details/')[1]) {
			this.id = this.location.path().split('/users/common/details/')[1]
			this.getUser();
		} else {
			this.router.navigate(['/users/common/details/'])
		}
	}

	loading: boolean;
	id: string;
	user: any;

	getUser() {
		this.requests.getUser(this.id).subscribe(
			response => {
				this.user = response;
			},
			err => {
				console.log(err)
			},
			() => {
				setTimeout(() => {
					this.loading = false
				}, 1000);
			}
		)
	}

}
