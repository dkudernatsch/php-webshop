import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {UserAuthService} from './services/auth/user-auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    private isAdmin$: Observable<Boolean>;

    constructor(private userAuthService: UserAuthService,
                private router: Router) {
        this.isAdmin$ = userAuthService.hasScope('admin');
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let isAdmin = false;
        this.isAdmin$.subscribe((value: boolean) => {
            if (value === true) {
                isAdmin = true;
            } else {
                this.router.navigate(['/products']);
            }
        });
        return isAdmin;
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}
