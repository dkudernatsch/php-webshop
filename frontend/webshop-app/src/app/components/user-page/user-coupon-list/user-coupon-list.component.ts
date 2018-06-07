import {Component, OnInit} from '@angular/core';

import {flatMap, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {Coupon} from '../../../types/api/coupon';
import {CouponEndpointService} from '../../../services/api/coupon-endpoint.service';
import {UserEndpointService} from '../../../services/api/user-endpoint-service';
import {UserAuthService} from '../../../services/auth/user-auth.service';


@Component({
    selector: 'app-user-coupon-list',
    templateUrl: './user-coupon-list-comp.html'
})
export class UserCouponListComponent {

    // readonly NOW: Date = new Date();

    private coupons$: Observable<[Date, Coupon]>;

    constructor(private couponService: CouponEndpointService,
                private userEndPointService: UserEndpointService,
                private userAuthService: UserAuthService) {

        this.coupons$ = this.userAuthService.userID$.pipe(
            flatMap((userID: number) =>
                this.userEndPointService.getCouponsOf(userID)
            )
        ).pipe(
            map(coupons => coupons.map(
                (c) => [new Date(c.expiration_date), c]
                ).sort((a: [Date, Coupon], b: [Date, Coupon]) => b[0].getTime() - a[0].getTime())
            ),
            tap(console.log),
        );
    }
}
