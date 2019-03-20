import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-banners-update',
  templateUrl: './banners-update.component.html',
  styleUrls: ['./banners-update.component.css']
})
export class BannersUpdateComponent implements OnInit {

    constructor(
		private app: AppComponent,
		private requests: RequestsService,
        private router: Router,
        private location: Location,
	) { }

	ngOnInit() {
		this.loading = true;
		window.scrollTo(0, 0)
		if (this.location.path().split('/banners/update/')[1]) {
			this.id = this.location.path().split('/banners/update/')[1]
			this.getBanner();
		} else {
			this.router.navigate(['/banners'])
		}
	}

	loading: boolean;
	loading_submit: boolean;
	id: string;
	banner: any;

	getBanner() {
		this.requests.getBanner(this.id).subscribe(
			response => {
                this.banner = response;
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


	updateBanner() {
		this.loading_submit = true;
		
		this.requests.updateBanner(this.id, this.banner).subscribe(
			response => {
			},
			err => {
				if (err.error.err) this.app.openGenericModal(err.error.err, 'Ops!', 'simple')
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
