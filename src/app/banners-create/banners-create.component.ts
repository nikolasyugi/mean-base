import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banners-create',
  templateUrl: './banners-create.component.html',
  styleUrls: ['./banners-create.component.css']
})
export class BannersCreateComponent implements OnInit {

    constructor(
		private app: AppComponent,
		private requests: RequestsService,
		private router: Router
	) { }

	ngOnInit() {
		window.scrollTo(0, 0);
	}

	loading_submit: boolean;
	name: string;
	from: string;
	to: string;
	url: string;

	createBanner() {
		this.loading_submit = true;
		let banner = {
			name: this.name,
			from: this.from,
			to: this.to,
			url: this.url,
		}
		this.requests.createBanner(banner).subscribe(
			response => {
			},
			err => {
				if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
				else console.log(err)
			},
			() => {
				this.router.navigate(['/banners'])
				this.loading_submit = false;
				this.app.openGenericModal('Banner criado com sucesso!', 'Parabéns!', 'simple')
			}
		)
	}

}
