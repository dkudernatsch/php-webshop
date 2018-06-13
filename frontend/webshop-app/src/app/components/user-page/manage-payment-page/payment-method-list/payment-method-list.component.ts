import {Component, Input} from '@angular/core';
import {NewPaymentMethod, PaymentMethod} from '../../../../types/api/user';
import {PaymentEndpointService} from '../../../../services/api/payment-endpoint.service';
import {UserAuthService} from '../../../../services/auth/user-auth.service';
import {first, flatMap, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {pluck} from "rxjs/internal/operators";


@Component({
    selector: 'app-payment-method-list',
    templateUrl: './payment-method-list-comp.html',
    styleUrls: ['../../user-page.css']
})
export class PaymentMethodListComponent {

    paymentMethods$: Observable<PaymentMethod[]>;

    private newPaymentMethod: NewPaymentMethod = {
        paymentMethod: {
            method: ''
        }
    };

//     this.userAuthService.user$.pipe(
//         pluck('id'),
//     switchMap(
// (id: number) => {
//     return this.orderEndPointService.placeOrder({
//                                                     coupon_id: couponID,
//                                                     payment_id: paymentMethod.id,
//     user_id: id,
//     products: orderItems
// })
// }
// )
// ).subscribe(() => {

    constructor(private paymentEndPointService: PaymentEndpointService,
                private userAuthService: UserAuthService) {
        this.paymentMethods$ = this.userAuthService.userID$.pipe(
            switchMap((userID: number | null) =>
                this.paymentEndPointService.getPaymentMethods(userID))
        );
    }

    refreshList() {
        this.paymentMethods$ = this.userAuthService.userID$.pipe(
            switchMap((userID: number | null) =>
                this.paymentEndPointService.getPaymentMethods(userID))
        );
    }

    onAddPaymentMethod() {
        this.userAuthService.userID$.pipe(
            switchMap((userID: number | null) =>
                this.paymentEndPointService.addPaymentMethod(this.newPaymentMethod, userID))
        ).pipe(first()).subscribe(
            (response: any) => {
                this.refreshList();
            }
        );
    }

    // gets called from list elements as event $event is the id of the paymentMethod
    onDeletePaymentMethod($event: number) {
        this.userAuthService.userID$.pipe(
            switchMap((userID: number | null) =>
                this.paymentEndPointService.deletePaymentMethod(userID, $event))
        ).pipe(first()).subscribe(
            (response: any) => {
                this.refreshList();
            }
        );
    }
}
