import {Component, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserAuthService} from '../../services/auth/user-auth.service';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../../types/api/user';
import {NgForm} from '@angular/forms';
import {debounce, debounceTime, delay, map} from 'rxjs/operators';
import {UserEndpointService} from '../../services/api/user-endpoint-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PasswordVerificationModalComponent} from './password-verification-modal/password-verification-modal.component';
import {StaticInjector} from '@angular/core/src/di/injector';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page-comp.html',
    styleUrls: ['user-page.css']
})
export class UserPageComponent {

     private user:  User = {
        id: null,
        username: '',
        mail: '',
        appellation: '',
        first_name: '',
        last_name: '',
        address: '',
        post_code: '',
        city: '',
        is_admin: false,
        is_active: true,
    };

    constructor(private userAuthService: UserAuthService,
                private authService: AuthService,
                private userEndpointService: UserEndpointService,
                private modalService: NgbModal) {
        this.userAuthService.user$
            .subscribe((user: User | null) => {
            this.user = user;
        });
    }



    onSubmitUpdateUser() {
        const modalRef = this.modalService.open(PasswordVerificationModalComponent);
        modalRef.componentInstance.userToUpdate = this.user;
        modalRef.result
            .then((result) => {
                this.authService.refresh();
            });
    }

}
