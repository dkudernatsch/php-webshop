import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserEndpointService} from '../../../services/api/user-endpoint-service';
import {NewUser, RegisterNew} from '../../../types/api/user';

@Component({
    selector: 'app-register-modal',
    templateUrl: './register-modal-comp.html',
    styleUrls: ['register-modal-component.css']
})

export class RegisterModalComponent {
    private password_repeat = '';
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

    constructor(private userEndpointService: UserEndpointService,
                public activeModal: NgbActiveModal) {
    }

    onSubmitRegister() {
        const newRegister: RegisterNew = {
            user: this.newUser
        };
        console.log(this.newUser);
        this.userEndpointService.create({user: this.newUser}).subscribe((response) => {
            console.log(response);
        });
        this.activeModal.close('Close click');
    }

}
