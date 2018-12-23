import { Component, OnInit } from '@angular/core';
import { TimeoutError } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		this.loading = false;
	}
	loading: boolean;
}
