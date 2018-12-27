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

	getBanners(): any {
		httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': this.contenttype,
				'Language': 'PT',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin',
				'withCredentials': 'true'
			}),
			withCredentials: true
		}
		return this.http.get(this.apiUrl + '/home/getBanners', httpOptions)
	}
}