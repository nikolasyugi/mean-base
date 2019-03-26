import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-faqs-details',
	templateUrl: './faqs-details.component.html',
	styleUrls: ['./faqs-details.component.css']
})
export class FaqsDetailsComponent implements OnInit {

	constructor(
		private app: AppComponent,
		private requests: RequestsService,
		private location: Location,
		private router: Router
	) { }

	ngOnInit() {
		this.loading = true;
		window.scrollTo(0, 0)
		if (this.location.path().split('/faqs/details/')[1]) {
			this.id = this.location.path().split('/faqs/details/')[1]
			this.getFaq();
		} else {
			this.router.navigate(['/faqs/details/'])
		}
	}

	loading: boolean;
	id: string;
	faq: any;

	getFaq() {
		this.requests.getFaq(this.id).subscribe(
			response => {
				this.faq = response;
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
