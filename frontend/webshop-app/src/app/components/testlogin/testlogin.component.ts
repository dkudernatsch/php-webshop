import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/auth/user-auth.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-testlogin',
  templateUrl: './testlogin.component.html',
})
export class TestloginComponent {


    private isUser$;
    private isAdmin$;
    private isAnonymous$;

    constructor(private userAuthService: UserAuthService, private authService: AuthService) {
        this.isAdmin$ = userAuthService.hasScope('admin');
        this.isUser$ = userAuthService.hasScope('user');
        this.isAnonymous$ = userAuthService.hasScope('anonymous');
    }


    loginUser() {
        this.authService.updateAuth({username: 'if17b094', password: 'hellokitty'});
    }

    loginAdmin() {
        this.authService.updateAuth({username: 'admin', password: 'admin'});
    }

    logout() {
        this.authService.updateAuth({});
    }
}
