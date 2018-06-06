import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PaymentMethod} from "../../../types/api/user";
import {UserEndpointService} from "../../../services/api/user-endpoint-service";
import {Observable} from "rxjs/internal/Observable";
import {PaymentEndpointService} from "../../../services/api/payment-endpoint.service";
import {UserAuthService} from "../../../services/auth/user-auth.service";
import {flatMap} from "rxjs/operators";

@Component({
    selector: 'app-paying-modal',
    templateUrl: './paying-modal-comp.html',
})
export class PayingModalComponent {

    paymentMethods$: Observable<PaymentMethod[]>;

    constructor(public activeModal: NgbActiveModal,
                private paymentEndPointService: PaymentEndpointService,
                private userAuthService: UserAuthService) {

        this.paymentMethods$ = this.userAuthService.userID$.pipe(
            flatMap((userID: number | null) =>
                this.paymentEndPointService.getPaymentMethods(userID))
        );
    }

    onSubmit() {
        this.activeModal.close('Close click');
    }
}
