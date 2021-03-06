import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Subject } from 'rxjs';
import { AppComponent } from '../app.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy, OnInit {

	@ViewChild('removeModal') removeModal: ElementRef


	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	optionsOpened: boolean = false;


	constructor(
		private requests: RequestsService,
		private modalService: BsModalService,
		private router: Router,
		private app: AppComponent
	) { }

	modalRef: BsModalRef;
	openModal(template) {
		this.modalRef = this.modalService.show(template, { class: 'modal-md' });
	}

	ngOnInit(): void {
		window.scrollTo(0, 0);
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
		this.requests.getUsers().subscribe(
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

	deleteId: string;
	openDelete(user, id) {
		user.optionsOpened = false;
		this.deleteId = id;
		this.openModal(this.removeModal);
	}

	deleteUser() {
		this.requests.deleteUser(this.deleteId).subscribe(
			response => {
			},
			err => {
				if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
				else console.log(err)
			},
			() => {
				this.router.navigate(['/users/common'])
				this.modalRef.hide();
				this.app.openGenericModal('Usuário removido com sucesso!', 'Parabéns!', 'simple')
			}
		)
	}
}
