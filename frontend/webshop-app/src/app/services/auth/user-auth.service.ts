import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../types/user';
import {Token} from './userAuth';

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {

    constructor(private authService: AuthService) {
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
    }

    // requires api to work
    public readonly user$: Observable<User>;

    public readonly isLoggedIn$: Observable<Boolean>;

    public readonly userScope$: Observable<[Scope]>;

    public hasScope(scope: Scope): Observable<Boolean> {
        return this.userScope$.pipe(
            map((scopes: Scope[]) => scopes.includes(scope))
        );
    }

}


type Scope
    = 'user'
    | 'admin'
    | 'anonymous';

function isScope(val: any): val is Scope {
    return val === 'user'
        || val === 'admin'
        || val === 'anonymous';
}
