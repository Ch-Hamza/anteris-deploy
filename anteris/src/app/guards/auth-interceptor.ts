import { HTTP_INTERCEPTORS, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
 
const TOKEN_HEADER_KEY = 'Authorization';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor(private loginService: LoginService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    //console.log("token expired");
                    this.loginService.logout();
                    this.router.navigate(['/login']);
                }
            }
        }));
    }
 
    /*intercept(req: HttpRequest<any>, next: HttpHandler) {

        /*return next.handle(req).subscribe(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                // do stuff with response if you want
                }
            }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/login']);
              }
            }
            });
        let authReq = req;
        if(localStorage.getItem('currentUser') != null) {
            const token = JSON.parse(localStorage.getItem('currentUser')).token;
            if (token != null) {
                authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
            } else {
                this.router.navigate(['/login']);
            }
        }
        return next.handle(authReq);
    }*/
}
 
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];