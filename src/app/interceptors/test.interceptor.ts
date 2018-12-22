import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class Test implements HttpInterceptor {

    constructor() { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    //console.log('---> status:', evt.status);
                    // console.log('---> filter:', req.params.get('filter'));
                }
            }),
            catchError(err => {
                if (err.status == 500) {
                    alert('500 Internal server error')
                    return EMPTY;
                } else {
                    return throwError(err);
                }
            })
        );

    }

}