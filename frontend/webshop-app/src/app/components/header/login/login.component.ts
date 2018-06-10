import {Component, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {UserAuthService} from '../../../services/auth/user-auth.service';
import {AuthService} from '../../../services/auth/auth.service';
import {UserAuth} from '../../../services/auth/userAuth';
import {UserEndpointService} from '../../../services/api/user-endpoint-service';
import {NewUser, RegisterNew, User} from '../../../types/api/user';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RegisterModalComponent} from "../register-modal/register-modal.component";

@Component({
    selector: 'app-login',
    templateUrl: './login-comp.html',
    styleUrls: ['login-component.css']
})
export class LoginComponent {

    // local references to loginForm -- not possible for registerForm because it is a modal
    @ViewChild('loginForm') loginForm: NgForm;
    private isUser$;
    private user$: Observable<User | null>;
    private password_repeat = '';

    private rememberMe = true;

    private newUser: NewUser = {
        username: '',
        password: '',
        mail: '',
        appellation: '',
        first_name: '',
        last_name: '',
        address: '',
        post_code: '',
        city: ''
    };

    constructor(private modalService: NgbModal,
                private userAuthService: UserAuthService,
                private authService: AuthService,
                private userEndpointService: UserEndpointService) {
        this.isUser$ = userAuthService.hasScope('user');

        // Observable<User> to show Login info
        this.user$ = this.userAuthService.user$;
    }

    onRegisterNew() {
        console.log('opening register modal');
        const modalRef = this.modalService.open(RegisterModalComponent);
    }

    onSubmitLogin() {
        console.log(this.loginForm);
        console.log(this.loginForm.value);
        console.log(this.loginForm.value.username);
        console.log(this.loginForm.value.password);
        this.login({username: this.loginForm.value.username, password: this.loginForm.value.password});
    }

    onSubmitRegister() {
        const newRegister: RegisterNew = {
            user: this.newUser
        };
        console.log(this.newUser);
        this.userEndpointService.create({user: this.newUser}).subscribe((response) => {
            console.log(response);
        });
    }

    login(userAuth: UserAuth) {
        if (this.rememberMe) {
            localStorage.setItem('stay-logged-in', 'true');
        } else {
            localStorage.setItem('stay-logged-in', 'false');
        }
        this.authService.updateAuth(userAuth);
    }

    logout() {
        this.authService.updateAuth({});
    }

}
