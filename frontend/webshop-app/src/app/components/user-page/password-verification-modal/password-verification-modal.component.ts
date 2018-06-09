import {Component, OnInit, ViewChild} from '@angular/core';
import {UserEndpointService} from '../../../services/api/user-endpoint-service';
import {UserAuthService} from '../../../services/auth/user-auth.service';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../../../types/api/user';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from '../../../services/auth/login.service';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'app-password-verification-modal',
    templateUrl: './password-verification-modal.component.html',
})
export class PasswordVerificationModalComponent {

    public userToUpdate: User;
    private password = '';
    private user$: Observable<User | null>;
    private failed = false;

    constructor(private authService: UserAuthService,
                private loginService: LoginService,
                private userService: UserEndpointService,
                private activeModal: NgbActiveModal) {

        this.user$ = authService.user$;
    }

    updateData() {
        this.loginService.login({
            username: this.userToUpdate.username,
            password: this.password })
            .subscribe(
                () => {
                    this.userService.updateUser(this.userToUpdate).subscribe();
                    this.activeModal.close('success');
                },
                (err) => {
                    this.failed = true;
                },
            );
    }
}
