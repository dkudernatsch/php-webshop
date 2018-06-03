import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Token} from './userAuth';

@Injectable({
    providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor {

    private bearer = '';


    constructor(private authService: AuthService) {
        authService.token().subscribe(
            (tok: Token) => {
                console.log('updated interceptor token');
                this.bearer = 'Bearer ' + tok.token;
            }
        );
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.endsWith('token')) {
            return next.handle(req);
        }

        console.log('Authorized request with: ' + this.bearer);
        const auth_req = req.clone({
            setHeaders: {
                'Authorization': this.bearer
            }
        });
        return next.handle(auth_req);
    }

}
