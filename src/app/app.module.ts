import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { Ng5SliderModule } from 'ng5-slider';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { DataTablesModule } from 'angular-datatables';

import { Test } from './interceptors/test.interceptor';
import { Notauth } from './interceptors/notauth.interceptor';
import { GuardService } from './guard/guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SideComponent } from './side/side.component';
import { SuperUsersComponent } from './super-users/super-users.component';
import { UsersComponent } from './users/users.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersUpdateComponent } from './users-update/users-update.component';
import { SuperUsersCreateComponent } from './super-users-create/super-users-create.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { FormPictureComponent } from './form-picture/form-picture.component';
import { BannersComponent } from './banners/banners.component';
import { BannersCreateComponent } from './banners-create/banners-create.component';
import { BannersUpdateComponent } from './banners-update/banners-update.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqsCreateComponent } from './faqs-create/faqs-create.component';
import { FaqsUpdateComponent } from './faqs-update/faqs-update.component';
import { FaqsDetailsComponent } from './faqs-details/faqs-details.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
	direction: 'horizontal',
};
@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		SideComponent,
		SuperUsersComponent,
		UsersComponent,
		UsersCreateComponent,
		UsersUpdateComponent,
		SuperUsersCreateComponent,
		EditPasswordComponent,
		UsersDetailsComponent,
		FormPictureComponent,
		BannersComponent,
		BannersCreateComponent,
		BannersUpdateComponent,
		FaqsComponent,
		FaqsCreateComponent,
		FaqsUpdateComponent,
		FaqsDetailsComponent,
		ResetPasswordComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgxMaskModule,
		NgxImageGalleryModule,
		Ng5SliderModule,
		SwiperModule,
		ModalModule.forRoot(),
		HttpClientModule,
		AgmCoreModule.forRoot({
			apiKey: ''
		}),
		NgbModule.forRoot(),
		Ng5SliderModule,
		NgxMaskModule.forRoot(),
		NgxImageGalleryModule,
		DataTablesModule
	],
	exports: [
		ModalModule
	],
	providers: [
		{
			provide: SWIPER_CONFIG,
			useValue: DEFAULT_SWIPER_CONFIG
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: Notauth,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: Test,
			multi: true
		},
		GuardService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
