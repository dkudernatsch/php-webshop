import {Injectable} from '@angular/core';

import {Subject} from 'rxjs/internal/Subject';

import {RequestCacheService} from '../request-cache.service';
import {LoginService} from './login.service';
import {Observable} from 'rxjs/internal/Observable';
import {Token, UserAuth} from './userAuth';
import {ReplaySubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token$: Subject<Token> = new ReplaySubject(1);

    constructor(private cacheService: RequestCacheService, private loginService: LoginService) {
        this.updateAuth({}, false);
    }

    token(): Observable<Token> {
        return this.token$.asObservable();
    }

    updateAuth(userAuth: UserAuth, invalidate: boolean = true) {
        if (invalidate) {
            this.cacheService.invalidate('userToken');
        }
        this.cacheService
            .cacheObservable<Token>('userToken', this.loginService.login(userAuth), new Date(), (t: Token) => new Date(t.expires * 1000))
            .subscribe((token) => this.token$.next(token));
    }

}
