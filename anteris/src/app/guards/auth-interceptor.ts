import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('currentUser') != null) {
            const token = JSON.parse(localStorage.getItem('currentUser')).token;
            let authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            
            return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // console.log("token expired or permission denied");
                        this.loginService.logout();
                        this.router.navigate(['/login']);
                    }
                }
            }));
        } else {
            this.router.navigate(['/login']);
            return next.handle(request);
        }
    }
}