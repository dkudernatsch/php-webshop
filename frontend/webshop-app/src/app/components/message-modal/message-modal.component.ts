import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageModalService} from '../../services/message-modal/message-modal.service';

@Component({
    selector: 'app-paying-modal',
    templateUrl: './message-modal-comp.html',
})
export class MessageModalComponent {
    title = '';
    message = '';

    constructor(public activeModal: NgbActiveModal,
                private messageModalService: MessageModalService) {
        this.title = this.messageModalService.title;
        this.message = this.messageModalService.message;
    }

    close() {
        this.activeModal.close('Close Action');
    }
}
