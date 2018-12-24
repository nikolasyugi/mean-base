import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy, OnInit {

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	optionsOpened: boolean = false;


	constructor(
		private requests: RequestsService
	) { }

	ngOnInit(): void {
		this.loading = true;
		this.getUsers();
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
	}

	users;
	loading;
	getUsers() {
		this.requests.teste().subscribe(
			response => {
				this.users = response;
			},
			err => {
				console.log(err)
			},
			() => {
				setTimeout(() => {
					this.loading = false
				}, 1000);
				this.dtTrigger.next();
			}
		)
	}
	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}