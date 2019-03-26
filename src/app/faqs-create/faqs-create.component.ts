import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faqs-create',
  templateUrl: './faqs-create.component.html',
  styleUrls: ['./faqs-create.component.css']
})
export class FaqsCreateComponent implements OnInit {

    constructor(
		private app: AppComponent,
		private requests: RequestsService,
		private router: Router
	) { }

	ngOnInit() {
		window.scrollTo(0, 0);
	}

	loading_submit: boolean;
	position: number;
	question: string;
	answer: string;

	createFaq() {
		this.loading_submit = true;
		let faq = {
			position: this.position,
			question: this.question,
			answer: this.answer,
        }
		this.requests.createFaq(faq).subscribe(
			response => {
			},
			err => {
				if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
				else console.log(err)
			},
			() => {
				this.router.navigate(['/faqs'])
				this.loading_submit = false;
				this.app.openGenericModal('Faq criado com sucesso!', 'Parabéns!', 'simple')
			}
		)
	}

}
