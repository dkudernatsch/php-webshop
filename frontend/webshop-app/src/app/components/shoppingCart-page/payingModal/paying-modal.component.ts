import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-paying-modal',
    templateUrl: './paying-modal-comp.html',
})
export class PayingModalComponent {
    @Input() name;

    constructor(public activeModal: NgbActiveModal) {}

}
