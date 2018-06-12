import {Component, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PaymentMethod} from '../../../types/api/user';
import {Observable} from 'rxjs/internal/Observable';
import {PaymentEndpointService} from '../../../services/api/payment-endpoint.service';
import {UserAuthService} from '../../../services/auth/user-auth.service';
import {flatMap, switchMap} from 'rxjs/operators';
import {Coupon} from '../../../types/api/coupon';
import {UserEndpointService} from '../../../services/api/user-endpoint-service';
import {OrderEndpointService} from '../../../services/api/order-endpoint.service';
import {ShoppingCartService} from '../../../services/products/shoppingCart.service';
import {NgForm} from '@angular/forms';
import {MessageModalService} from "../../../services/message-modal/message-modal.service";
import {MessageModalComponent} from "../../message-modal/message-modal.component";
import {pluck} from "rxjs/internal/operators";

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
                private shoppingCartService: ShoppingCartService,
                private messageModalService: MessageModalService,
                private modalService: NgbModal) {
        this.paymentMethods$ = this.userAuthService.userID$.pipe(
            switchMap((userID: number | null) =>
                this.paymentEndPointService.getPaymentMethods(userID))
        );
        this.coupons$ = this.userAuthService.userID$.pipe(
            switchMap((userID: number | null) =>
                this.userEndPointService.getCouponsOf(userID)
            )
        );
    }

    setMessageModal() {
        this.messageModalService.setTitle('Thank you');
        this.messageModalService.setMessage('Thanks for buying at our shop, and have fun with our products!')
    }

    onSubmit() {
        this.setMessageModal();

        const paymentMethod = this.buyingForm.value.paymentMethod;
        const coupon = this.buyingForm.value.coupon;
        const couponID = coupon ? coupon.id : null;
        const orderItems = this.shoppingCartService.getAsOrderItems();


        this.userAuthService.user$.pipe(
            pluck('id'),
            switchMap(
                (id: number) => {
                    return this.orderEndPointService.placeOrder({
                        coupon_id: couponID,
                        payment_id: paymentMethod.id,
                        user_id: id,
                        products: orderItems
                    })
                }
            )
        ).subscribe(() => {
            this.shoppingCartService.resetCart();
            this.modalService.open(MessageModalComponent);
        });
        this.activeModal.close('Sent');
    }
}
