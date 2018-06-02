import {Injectable} from '@angular/core';
import {AnonymousLogin, Token, UserAuth} from './userAuth';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {}

    public login(auth: UserAuth): Observable<Token> {
        console.log('sending user token request');
        console.log(auth);
        return this.http.post<Token>('https://api.webshop.at/token', auth);
    }

}
