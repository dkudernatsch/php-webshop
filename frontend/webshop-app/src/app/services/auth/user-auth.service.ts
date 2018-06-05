import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
// import {User} from '../../types/user';
import {Token} from './userAuth';
import {isScope, Scope, User} from '../../types/api/user';
import {UserEndpointService} from '../api/user-endpoint-service';
import {of} from 'rxjs/internal/observable/of';

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {

    constructor(private authService: AuthService, private userApiService: UserEndpointService) {
        const decoded = authService.token().pipe(
            map((token: Token) => token.token.split('.')[1]
            ),
            map((tokendata: string) => JSON.parse(atob(tokendata))
            )
        );
        this.userScope$ = decoded.pipe(
            map((token: any) => token.scope.map((val) => {
                if (isScope(val)) {
                    return val;
                } else {
                    return null;
                }
            }))
        );

        this.isLoggedIn$ = this.userScope$.pipe(
            map((scopes: Scope[]) => scopes.includes('user') || scopes.includes('admin'))
        );

        this.user$ = decoded.pipe(
            flatMap((token: any) => {
                if (token.sub) {
                    console.log('logged as user: ' + token.sub);
                    return this.userApiService.byId(token.sub);
                } else {
                    return of(null);
                }
            })
        );
    }

    // requires api to work
    // TODO: needed to change that - does not return User
    public readonly user$: Observable<any | null>;

    public readonly isLoggedIn$: Observable<Boolean>;

    public readonly userScope$: Observable<[Scope]>;

    public hasScope(scope: Scope): Observable<Boolean> {
        return this.userScope$.pipe(
            map((scopes: Scope[]) => scopes.includes(scope))
        );
    }

}

