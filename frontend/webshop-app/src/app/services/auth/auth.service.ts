import {Injectable} from '@angular/core';
import {AnonymousLogin, Token, UserAuth} from './userAuth';

import {Subject} from 'rxjs/internal/Subject';

import {RequestCacheService} from '../request-cache.service';
import {LoginService} from './login.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token$: Subject<Token> = new Subject();

    constructor(private cacheService: RequestCacheService, private loginService: LoginService) {
       this.updateAuth({});
    }

    token(): Observable<Token> {
        return this.token$.asObservable();
    }

    updateAuth(userAuth: UserAuth) {
        this.cacheService
            .cacheObservable<Token>('userToken', this.loginService.login(userAuth), new Date())
            .subscribe((token) => this.token$.next(token));
    }

}
