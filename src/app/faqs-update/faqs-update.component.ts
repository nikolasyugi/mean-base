import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-faqs-update',
    templateUrl: './faqs-update.component.html',
    styleUrls: ['./faqs-update.component.css']
})
export class FaqsUpdateComponent implements OnInit {

    constructor(
        private app: AppComponent,
        private requests: RequestsService,
        private router: Router,
        private location: Location,
    ) { }

    ngOnInit() {
        this.loading = true;
        window.scrollTo(0, 0)
        if (this.location.path().split('/faqs/update/')[1]) {
            this.id = this.location.path().split('/faqs/update/')[1]
            this.getFaq();
        } else {
            this.router.navigate(['/faqs'])
        }
    }

    loading: boolean;
    loading_submit: boolean;
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


    updateFaq() {
        this.loading_submit = true;

        this.requests.updateFaq(this.id, this.faq).subscribe(
            response => {
            },
            err => {
                if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
                else console.log(err)
            },
            () => {
                this.router.navigate(['/faqs'])
                this.loading_submit = false;
                this.app.openGenericModal('Faq alterado com sucesso!', 'Parabéns!', 'simple')
            }
        )
    }

}
