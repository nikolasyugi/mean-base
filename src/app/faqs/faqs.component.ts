import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Subject } from 'rxjs';
import { AppComponent } from '../app.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
@Component({
	selector: 'app-faqs',
	templateUrl: './faqs.component.html',
	styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnDestroy, OnInit {

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
		this.getFaqs();
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
	}

	faqs;
	loading;
	getFaqs() {
		this.requests.getFaqs().subscribe(
			response => {
				this.faqs = response;
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
	openDelete(faq, id) {
		faq.optionsOpened = false;
		this.deleteId = id;
		this.openModal(this.removeModal);
	}

	deleteFaq() {
		this.requests.deleteFaq(this.deleteId).subscribe(
			response => {
			},
			err => {
				if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
				else console.log(err)
			},
			() => {
				this.router.navigate(['/faqs'])
				this.modalRef.hide();
				this.app.openGenericModal('Faq removido com sucesso!', 'Parabéns!', 'simple')
			}
		)
	}
}
