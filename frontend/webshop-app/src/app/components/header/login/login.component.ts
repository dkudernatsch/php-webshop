import {Component, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {UserAuthService} from '../../../services/auth/user-auth.service';
import {AuthService} from '../../../services/auth/auth.service';
import {UserAuth} from '../../../services/auth/userAuth';
import {UserEndpointService} from '../../../services/api/user-endpoint-service';
import {NewUser} from '../../../types/api/user';

@Component({
    selector: 'app-login',
    templateUrl: './login-comp.html',
    styleUrls: ['login-component.css']
})
export class LoginComponent {

    // local references to loginForm -- not possible for registerForm because it is a modal
    @ViewChild('loginForm') loginForm: NgForm;
    private isUser$;
    closeResult: string;

    constructor(private modalService: NgbModal,
                private userAuthService: UserAuthService,
                private authService: AuthService,
                private userEndpointService: UserEndpointService) {
        this.isUser$ = userAuthService.hasScope('user');
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    onSubmitLogin() {
        console.log(this.loginForm);
        console.log(this.loginForm.value);
        console.log(this.loginForm.value.username);
        console.log(this.loginForm.value.password);
        this.login({username: this.loginForm.value.username, password: this.loginForm.value.password});
    }

    onSubmitRegister(form: NgForm) {
        console.log(form);
        console.log(form.value.username);
        console.log(form.value.password);
        console.log(form.value.appellation);
        console.log(form.value.firstname);
        console.log(form.value.lastname);
        console.log(form.value.email);
        console.log(form.value.street);
        console.log(form.value.city);
        console.log(form.value.plz);
        const newU: NewUser = {
            username: form.value.username,
            password: form.value.password,
            mail: form.value.email,
            appellation: form.value.appellation,
            first_name: form.value.firstname,
            last_name: form.value.lastname,
            address: form.value.address,
            post_code: form.value.plz,
            city: form.value.city
        };
        this.userEndpointService.create(newU).subscribe();
    }

    login(userAuth: UserAuth) {
        this.authService.updateAuth(userAuth);
    }

    logout() {
        this.authService.updateAuth({});
    }

}
