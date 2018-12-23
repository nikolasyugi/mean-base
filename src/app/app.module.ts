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

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { Notauth } from './interceptors/notauth.interceptor';
import { Test } from './interceptors/test.interceptor';
import { HomeComponent } from './home/home.component';
import { SideComponent } from './side/side.component';
import { SuperUsersComponent } from './super-users/super-users.component';
import { UsersComponent } from './users/users.component';

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
		NgxImageGalleryModule
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
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
