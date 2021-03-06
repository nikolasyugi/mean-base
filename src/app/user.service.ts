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

	sign_in(email, password): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		let body = {
			email: email,
			password: password
		}
		return this.http.post<any>(this.apiUrl + '/sign_in', body, httpOptions)
	}

	logout(): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.post<any>(this.apiUrl + '/logout', httpOptions)
	}

	changePassword(body): any {
		httpOptions = {
			headers: new HttpHeaders(this.headers),
			withCredentials: true
		}
		return this.http.put<any>(this.apiUrl + '/changePassword', body, httpOptions)
	}

	updatePicture(id, fd): any {
		httpOptions = {
			headers: new HttpHeaders({
				'Language': 'PT',
				'Access-Control-Allow-Origin': '*',
				'withCredentials': 'true'
			}),
			withCredentials: true
		}
		return this.http.put<any>(this.apiUrl + '/user/picture/'+ id, fd, httpOptions)
    }
    
    forgotPassword(email): any {
		httpOptions = {
			headers: new HttpHeaders({
				'Language': 'PT',
				'Access-Control-Allow-Origin': '*',
				'withCredentials': 'true'
			}),
			withCredentials: true
        }
        let body = {
            email: email
        }
		return this.http.post<any>(this.apiUrl + '/resetPassword', body, httpOptions)
    }
    
    updatePassword(password, code): any {
		httpOptions = {
			headers: new HttpHeaders({
				'Language': 'PT',
				'Access-Control-Allow-Origin': '*',
				'withCredentials': 'true'
			}),
			withCredentials: true
        }
        let body = {
            password: password,
            code: code
        }
		return this.http.put<any>(this.apiUrl + '/user/password', body, httpOptions)
	}
}
