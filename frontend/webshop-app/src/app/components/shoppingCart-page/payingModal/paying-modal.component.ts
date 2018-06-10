import {Component, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PaymentMethod} from '../../../types/api/user';
import {Observable} from 'rxjs/internal/Observable';
import {PaymentEndpointService} from '../../../services/api/payment-endpoint.service';
import {UserAuthService} from '../../../services/auth/user-auth.service';
import {flatMap, map} from 'rxjs/operators';
import {Coupon} from "../../../types/api/coupon";
import {CouponEndpointService} from "../../../services/api/coupon-endpoint.service";
import {UserEndpointService} from "../../../services/api/user-endpoint-service";
import {OrderEndpointService} from "../../../services/api/order-endpoint.service";
import {ShoppingCartService} from "../../../services/products/shoppingCart.service";
import {OrderItem, OrderItem} from "../../../types/api/order";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-paying-modal',
    templateUrl: './paying-modal-comp.html',
})
export class PayingModalComponent {

    @ViewChild('buyingForm') buyingForm: NgForm;
    paymentMethods$: Observable<PaymentMethod[]>;
    private coupons$: Observable<Coupon[]>;

    constructor(public activeModal: NgbActiveModal,
                private paymentEndPointService: PaymentEndpointService,
                private userAuthService: UserAuthService,
                private userEndPointService: UserEndpointService,
                private orderEndPointService: OrderEndpointService,
                private shoppingCartService: ShoppingCartService) {
        this.paymentMethods$ = this.userAuthService.userID$.pipe(
            flatMap((userID: number | null) =>
                this.paymentEndPointService.getPaymentMethods(userID))
        );
        this.coupons$ = this.userAuthService.userID$.pipe(
            flatMap((userID: number | null) =>
                this.userEndPointService.getCouponsOf(userID)
            )
        )
    }

    onSubmit() {
        let paymentMethod = this.buyingForm.value.paymentMethod;
        let coupon = this.buyingForm.value.coupon;
        let couponID = coupon ? coupon.id : null;
        let orderItems = this.shoppingCartService.getAsOrderItems();
        this.userAuthService.userID$.pipe(
            flatMap((userID: number | null) =>
                this.orderEndPointService.placeOrder({
                    user_id: userID,
                    payment_id: paymentMethod.id,
                    coupon_id: couponID,
                    products: orderItems
                })
            )
        ).subscribe((response: any) => console.log(response));
        this.activeModal.close('Close click');
    }
}
