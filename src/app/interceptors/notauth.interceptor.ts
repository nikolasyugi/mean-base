import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()
export class Notauth implements HttpInterceptor {

    constructor(
        private router: Router,
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError(err => {
                if (err.status == 401) {
                    sessionStorage.clear()
                    localStorage.clear()
                    this.router.navigate(['/'])
                    alert('Você precisa fazer login novamente.')
                    return EMPTY;
                } else {
                    return throwError(err);
                }
            }));
    }

}