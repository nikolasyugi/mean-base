import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';

let httpOptions;

@Injectable({
	providedIn: 'root'
})
export class RequestsService {

	private apiUrl = '/api/v1'
	private contenttype = 'application/json';
	headers = {
		'Content-Type': this.contenttype,
		'Language': 'PT',
		'Access-Control-Allow-Origin': '*',
		'withCredentials': 'true'
	}
	constructor(
		private http: HttpClient
	) { }

	getUsers(): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.get<any>(this.apiUrl + '/users', httpOptions)
	}

	getUser(id): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.get<any>(this.apiUrl + '/users/' + id, httpOptions)
	}

	createUser(user): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.post<any>(this.apiUrl + '/users', user, httpOptions)
	}

	updateUser(id, user): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.put<any>(this.apiUrl + '/users/' + id, user, httpOptions)
	}

	deleteUser(id): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.delete<any>(this.apiUrl + '/users/' + id, httpOptions)
	}

	getSuperUsers(): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.get<any>(this.apiUrl + '/users/super_users', httpOptions)
	}

	getSuperUser(id): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.get<any>(this.apiUrl + '/users/super_users/' + id, httpOptions)
	}

	createSuperUser(user): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.post<any>(this.apiUrl + '/users/super_users', user, httpOptions)
	}

	updateSuperUser(id, user): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.put<any>(this.apiUrl + '/users/super_users' + id, user, httpOptions)
	}

	deleteSuperUser(id): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.delete<any>(this.apiUrl + '/users/super_users/' + id, httpOptions)
	}
}