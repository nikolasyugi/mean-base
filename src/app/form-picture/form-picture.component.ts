import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { AppComponent } from './../app.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-form-picture',
	templateUrl: './form-picture.component.html',
	styleUrls: ['./form-picture.component.css'],
})

export class FormPictureComponent implements OnInit {

	constructor(
		private requests: RequestsService,
		private UserService: UserService,
		private modalService: BsModalService,
		private app: AppComponent,
		private location: Location,
		private router: Router

	) { }

	

	ngOnInit() {
		if (this.location.path().split('/users/common/update/')[1]) {
			this.id = this.location.path().split('/users/common/update/')[1]
			this.getUser();
		} else {
			this.router.navigate(['/users/common'])
		}
		this.getUser()
		this.loading = false;
		this.loading_photo = false;
	}

	modalRef: BsModalRef;
	openModal(template) {
		this.modalRef = this.modalService.show(template, { class: '' });
	}
	
	photo;
	fd;
	loading_photo: boolean;
	loading: boolean;
	id: string;
	user: any;

	photoStyle() {
		if (this.user) {
			if (!this.user.manager) {
				if (this.user.picture == null) {
					return { 'background-image': 'url(' + '../../assets/images/missing.png' + ')' }
				} else {
					return { 'background-image': 'url(' + this.user.picture + ')' }
				}
			} else {
				if (this.user.company.logo == null) {
					return { 'background-image': 'url(' + '../../assets/images/missing-photo.png' + ')' }
				} else {
					return { 'background-image': 'url(' + this.user.company.logo + ')' }
				}
			}
		}
	}

	getUser() {
		this.requests.getUser(this.id).subscribe(
			response => {
				this.user = response;
			},
			err => {
				console.log(err)
			},
			() => {
				this.loading = false;
			}
		)
	}

	changePhoto(event) {
		if (event.target.files && event.target.files[0]) {
			this.loading_photo = true;
			this.photo = event.target.files[0];
			const formData: FormData = new FormData();
			formData.append('picture', this.photo)
			if (this.photo) {
				this.uploadPhoto(formData)
			}
		}
	}

	uploadPhoto(fd) {

		this.UserService.updatePicture(this.id, fd).subscribe(
			response => {
				this.loading_photo = false;
				this.user = response
			},
			err => {
				this.loading_photo = false;
				console.log(err)
				this.app.openGenericModal('Falha ao enviar a foto!', 'Ops!', 'simple');
			}
		)

	}

}
