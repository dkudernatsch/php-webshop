import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-redeem-coupon',
    templateUrl: './redeem-coupon-comp.html',
})
export class RedeemCouponComponent {

    couponCode = '';
    @Output() myRedeem: EventEmitter<string> = new EventEmitter();

    onRedeemCoupon() {
        this.myRedeem.emit(this.couponCode);
    }
}
