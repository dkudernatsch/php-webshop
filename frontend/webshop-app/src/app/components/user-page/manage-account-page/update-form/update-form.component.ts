import {Component} from '@angular/core';
import {User} from '../../../../types/api/user';
import {UserAuthService} from '../../../../services/auth/user-auth.service';
import {UserEndpointService} from '../../../../services/api/user-endpoint-service';
import {map} from 'rxjs/operators';
import {PasswordVerificationModalComponent} from '../../password-verification-modal/password-verification-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../../services/auth/auth.service';


@Component({
    selector: 'app-update-form',
    templateUrl: './update-form-comp.html',
    styleUrls: ['../../user-page.css']
})
export class UpdateFormComponent {

    private user: User = {
        id: -1,
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
        this.userAuthService.user$.subscribe((user: User | null) => {
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
