import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    constructor(
        private userService: UserService,
        private app: AppComponent,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        window.scrollTo(0, 0);
        localStorage.clear();
        this.activatedRoute.queryParams.subscribe(params => {
            this.code = params['code'];
        });
    }


    loading = false;
    password = '';
    confirm_password = '';
    code = '';

    updatePassword() {
        this.loading = true;
        if (this.password != this.confirm_password) {
            this.app.openGenericModal('Senha e confirmação de senha inconsistentes', 'Ops!', 'simple')
            this.loading = false;
        } else if (this.password.length < 8) {
            this.app.openGenericModal('Digite uma senha com no mínimo 8 caracteres', 'Ops!', 'simple')
            this.loading = false;
        } else {
            this.userService.updatePassword(this.password, this.code).subscribe(
                response => {
                },
                err => {
                    if (err.error.err) this.app.openGenericModal(err.error.err, 'Ops!', 'simple')
                    else if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
                    else console.log(err)
                    this.loading = false;
                },
                () => {
                    this.confirm_password = '';
                    this.password = '';
                    this.app.openGenericModal('Senha alterada com sucesso', 'Parabéns!', 'simple')
                    this.loading = false;
                }
            )
        }
    }
}
