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

    getAbout(): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.get<any>(this.apiUrl + '/user/about', httpOptions)
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

    isLogged() {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.get<any>(this.apiUrl + '/user/isLogged/', httpOptions)
    }

    getBanners(): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.get<any>(this.apiUrl + '/banners', httpOptions)
    }

    getBanner(id): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.get<any>(this.apiUrl + '/banners/' + id, httpOptions)
    }

    createBanner(banner): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.post<any>(this.apiUrl + '/banners', banner, httpOptions)
    }

    updateBanner(id, banner): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.put<any>(this.apiUrl + '/banners/' + id, banner, httpOptions)
    }

    deleteBanner(id): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.delete<any>(this.apiUrl + '/banners/' + id, httpOptions)
    }

    updatePictureBanner(id, fd): any {
        let headers = {
            'Language': 'PT',
            'Access-Control-Allow-Origin': '*',
            'withCredentials': 'true'
        }
        httpOptions = {
            headers: new HttpHeaders(headers),
            withCredentials: true
        }
        return this.http.put<any>(this.apiUrl + '/banner/picture/' + id, fd, httpOptions)
    }

    getFaqs(): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.get<any>(this.apiUrl + '/faqs', httpOptions)
    }

    getFaq(id): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.get<any>(this.apiUrl + '/faqs/' + id, httpOptions)
    }

    createFaq(banner): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.post<any>(this.apiUrl + '/faqs', banner, httpOptions)
    }

    updateFaq(id, banner): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.put<any>(this.apiUrl + '/faqs/' + id, banner, httpOptions)
    }

    deleteFaq(id): any {
        httpOptions = {
            headers: new HttpHeaders(this.headers),
            withCredentials: true
        }
        return this.http.delete<any>(this.apiUrl + '/faqs/' + id, httpOptions)
    }

}