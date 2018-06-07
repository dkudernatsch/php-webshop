import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {UserAuthService} from './services/auth/user-auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UserAuthGuard implements CanActivate {
    private isUser$: Observable<Boolean>;

    constructor(private userAuthService: UserAuthService,
                private router: Router) {
        this.isUser$ = userAuthService.hasScope('user');
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let isUser = false;
        this.isUser$.subscribe((value: boolean) => {
            if (value === true) {
                isUser = true;
            } else {
                this.router.navigate(['']);
            }
        });
        return isUser;
    }

    // canActivateChild(route: ActivatedRouteSnapshot,
    //                  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //     return this.canActivate(route, state);
    // }
}
