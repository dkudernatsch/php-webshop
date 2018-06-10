import {Component} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserEndpointService} from '../../../services/api/user-endpoint-service';
import {NewUser, RegisterNew} from '../../../types/api/user';
import {MessageModalService} from "../../../services/message-modal/message-modal.service";
import {MessageModalComponent} from "../../message-modal/message-modal.component";

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
                public activeModal: NgbActiveModal,
                private messageModalService: MessageModalService,
                private modalService: NgbModal) {
    }

    setMessageModal() {
        this.messageModalService.setTitle('Thanks for registering!');
        this.messageModalService.setMessage('You can now login and buy products as well as look at your user page to redeem coupons and change your personal data.')
    }

    onSubmitRegister() {
        this.setMessageModal();
        const newRegister: RegisterNew = {
            user: this.newUser
        };
        console.log(this.newUser);
        this.userEndpointService.create({user: this.newUser}).subscribe((response) => {
            console.log(response);
        });
        this.activeModal.close('Close click');
        const modalRef = this.modalService.open(MessageModalComponent);
    }

}
