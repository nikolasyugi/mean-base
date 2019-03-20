import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { SuperUsersComponent } from './super-users/super-users.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersUpdateComponent } from './users-update/users-update.component';
import { SuperUsersCreateComponent } from './super-users-create/super-users-create.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { BannersComponent } from './banners/banners.component';
import { BannersCreateComponent } from './banners-create/banners-create.component';
import { BannersUpdateComponent } from './banners-update/banners-update.component';


const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
		canActivate: []
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: []
	},
	{
		path: 'edit-password',
		component: EditPasswordComponent,
		canActivate: []
	},
	{
		path: 'users/common',
		component: UsersComponent,
		canActivate: []
	},
	{
		path: 'users/common/details/:id',
		component: UsersDetailsComponent,
		canActivate: []
	},
	{
		path: 'users/common/create',
		component: UsersCreateComponent,
		canActivate: []
	},
	{
		path: 'users/common/update/:id',
		component: UsersUpdateComponent,
		canActivate: []
	},
	{
		path: 'users/super_users',
		component: SuperUsersComponent,
		canActivate: []
	},
	{
		path: 'users/super_users/create',
		component: SuperUsersCreateComponent,
		canActivate: []
	},
	{
		path: 'banners',
		component: BannersComponent,
		canActivate: []
    },
    {
		path: 'banners/create',
		component: BannersCreateComponent,
		canActivate: []
	},
	{
		path: 'banners/update/:id',
		component: BannersUpdateComponent,
		canActivate: []
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	],
	declarations: []
})
export class AppRoutingModule { }
