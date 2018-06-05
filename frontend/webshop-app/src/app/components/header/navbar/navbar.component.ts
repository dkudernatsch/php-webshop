import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {UserAuthService} from '../../../services/auth/user-auth.service';
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar-comp.html',
  styleUrls: ['navbar-comp.css']
})
export class NavbarComponent {
  private isUser$: Observable<boolean>;
  private isAdmin$: Observable<boolean>;
  private isAnonymous$: Observable<boolean>;

  constructor(private userAuthService: UserAuthService, private authService: AuthService) {
    this.isAdmin$ = userAuthService.hasScope('admin');
    this.isUser$ = userAuthService.hasScope('user');
    this.isAnonymous$ = userAuthService.hasScope('anonymous');

  }
}
