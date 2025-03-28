import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request;
        if(req.url.includes('/login') || req.url.includes('/register') || (req.method === 'GET' && (req.url.includes('/api/media') || req.url.includes('/api/category'))) || (req.method === 'POST' && req.url.includes('/api/contact')) ) {
            return next.handle(req);
        } else {
            const token = localStorage.getItem('user-token');
            if((req.method === 'POST' || req.method === 'PUT') && req.body instanceof FormData) {
                request = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${ token }`
                    }
                });
            } else {
                request = req.clone({
                    setHeaders: {
                        'Content-Type': 'application/json; charset=utf-8',
                        Accept: 'application/json',
                        Authorization: `Bearer ${ token }`
                    }
                });
            }
        }
        return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                if(error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED");
                }
                const err = error.error.message || error.statusText;
                return throwError(error);
            })
        );      
    }
}