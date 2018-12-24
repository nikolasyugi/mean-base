import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { SuperUsersComponent } from './super-users/super-users.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersUpdateComponent } from './users-update/users-update.component';


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
		path: 'users/common',
		component: UsersComponent,
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
	}
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
