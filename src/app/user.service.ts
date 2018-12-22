import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let httpOptions;

@Injectable({
	providedIn: 'root'
})

export class UserService {

	private apiUrl = '/api/v1'
	private contenttype = 'application/json';
	headers = {
		'Content-Type': this.contenttype,
		'Language': 'PT',
		'Access-Control-Allow-Origin': '*',
		'withCredentials': 'true'
	}
	constructor(
		private http: HttpClient,
	) { }

	signUp(user): any {
		httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': this.contenttype,
				'Language': 'PT',
				'Access-Control-Allow-Origin': '*',
				'withCredentials': 'true'
			}),
			withCredentials: true
		}
		return this.http.post<any>(this.apiUrl + '/login/signup', user, httpOptions)
	}

	signIn(user): any {
		httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': this.contenttype,
				'Language': 'PT',
				'Access-Control-Allow-Origin': '*',
				'withCredentials': 'true'
			}),
			withCredentials: true
		}
		return this.http.post<any>(this.apiUrl + '/login/signin', user, httpOptions)
	}

	signOut() {
		httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': this.contenttype,
				'Language': 'PT',
				'Access-Control-Allow-Origin': '*',
				'withCredentials': 'true'
			}),
			withCredentials: true
		}
		return this.http.get<any>(this.apiUrl + '/login/logout', httpOptions)
	}

	forgotPassword(email): any {
		httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': this.contenttype,
				'Language': 'PT',
				'Access-Control-Allow-Origin': '*',
				'withCredentials': 'true'
			}),
			withCredentials: true
		}
		let body = {
			email: email
		}
		console.log(body)
		return this.http.post<any>(this.apiUrl + '/login/forgotPass', body, httpOptions)
	}

	uploadPhoto(fd): any {
		httpOptions = {
			headers: new HttpHeaders({
				//'Content-Type': this.contenttype,
				'Language': 'PT',
				'Access-Control-Allow-Origin': '*',
				'withCredentials': 'true'
			}),
			withCredentials: true
		}

		return this.http.post<any>(this.apiUrl + '/account/updatePhoto', fd, httpOptions)
	}
}
