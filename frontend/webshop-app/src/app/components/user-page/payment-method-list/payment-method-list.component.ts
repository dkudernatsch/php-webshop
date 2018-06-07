import {Component, Input} from '@angular/core';
import {NewPaymentMethod, PaymentMethod} from '../../../types/api/user';
import {PaymentEndpointService} from '../../../services/api/payment-endpoint.service';
import {UserAuthService} from '../../../services/auth/user-auth.service';
import {flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';


@Component({
    selector: 'app-payment-method-list',
    templateUrl: './payment-method-list-comp.html',
    styleUrls: ['../user-page.css']
})
export class PaymentMethodListComponent {

    paymentMethods$: Observable<PaymentMethod[]>;

    private newPaymentMethod: NewPaymentMethod = {
        paymentMethod: {
            method: ''
        }
    };

    constructor(private paymentEndPointService: PaymentEndpointService,
                private userAuthService: UserAuthService) {
        this.paymentMethods$ = this.userAuthService.userID$.pipe(
            flatMap((userID: number | null) =>
                this.paymentEndPointService.getPaymentMethods(userID))
        );
    }

    onAddPaymentMethod() {
        this.userAuthService.userID$.pipe(
            flatMap((userID: number | null) =>
                this.paymentEndPointService.addPaymentMethod(this.newPaymentMethod, userID))
        ).subscribe(
            (response: any) => console.log(response)
        );

        // reset the field
        // this.newPaymentMethod = {
        //     paymentMethod: {
        //         method: ''
        //     }
        // };
    }
}
