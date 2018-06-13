import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {UserAuthService} from './services/auth/user-auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class NotAdminAuthGuard implements CanActivate {
    private isAdmin$: Observable<Boolean>;

    constructor(private userAuthService: UserAuthService,
                private router: Router) {
        this.isAdmin$ = userAuthService.hasScope('admin');
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let notAdmin = false;
        this.isAdmin$.subscribe((value: boolean) => {
            if (value === true) {
                this.router.navigate(['/admin']);
            } else {
                notAdmin = true;
            }
        });
        return notAdmin;
    }
}
