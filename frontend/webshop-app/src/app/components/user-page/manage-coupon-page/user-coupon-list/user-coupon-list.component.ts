import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Coupon} from '../../../../types/api/coupon';
import {CouponEndpointService} from "../../../../services/api/coupon-endpoint.service";
import {first, flatMap, map, switchMap, tap} from "rxjs/operators";
import {UserAuthService} from "../../../../services/auth/user-auth.service";
import {UserEndpointService} from "../../../../services/api/user-endpoint-service";



@Component({
    selector: 'app-user-coupon-list',
    templateUrl: './user-coupon-list-comp.html'
})
export class UserCouponListComponent {

    private coupons$: Observable<[Date, Coupon]>;

    // for redeem coupon
    couponCode = '';

    constructor(private couponService: CouponEndpointService,
                private userEndPointService: UserEndpointService,
                private userAuthService: UserAuthService) {
        this.refreshCoupons();
    }


    refreshCoupons() {
        this.coupons$ = this.userAuthService.userID$.pipe(
            switchMap((userID: number) =>
                this.userEndPointService.getCouponsOf(userID)
            )
        ).pipe(
            map(coupons => coupons.map(
                (c: Coupon) => [new Date(c.expiration_date), c]
                ).sort((a: [Date, Coupon], b: [Date, Coupon]) => b[0].getTime() - a[0].getTime())
            ),
            tap(console.log),
        );
    }

    onRedeemCoupon() {
        this.userAuthService.userID$.pipe(
            switchMap((userID: number) =>
                this.couponService.redeemCoupon(this.couponCode, userID)
            )
        ).pipe((first())).subscribe((response: any) =>  // update the coupon list
            this.refreshCoupons()
        );
    }
}
