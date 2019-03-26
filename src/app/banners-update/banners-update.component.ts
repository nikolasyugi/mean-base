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

    fd;
    photo;
    loading: boolean;
    loading_photo: boolean;
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
                if (err.error.message) this.app.openGenericModal(err.error.message, 'Ops!', 'simple')
                else console.log(err)
            },
            () => {
                this.router.navigate(['/banners'])
                this.loading_submit = false;
                this.app.openGenericModal('Banner alterado com sucesso!', 'Parabéns!', 'simple')
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

        this.requests.updatePictureBanner(this.id, fd).subscribe(
            response => {
                this.loading_photo = false;
                this.banner = response
            },
            err => {
                this.loading_photo = false;
                console.log(err)
                this.app.openGenericModal('Falha ao enviar a foto!', 'Ops!', 'simple');
            }
        )

    }

    loadingPhoto() {
        if (this.loading_photo) {
            return {
                "opacity": "0.3",
            };
        }
    }

}
