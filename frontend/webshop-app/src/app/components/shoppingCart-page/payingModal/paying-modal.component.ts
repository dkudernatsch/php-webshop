import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-paying-modal',
    templateUrl: './paying-modal-comp.html',
})
export class PayingModalComponent {

    constructor(public activeModal: NgbActiveModal) {}

}
