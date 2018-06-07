import {Component, OnInit} from '@angular/core';
import {CouponEndpointService} from '../../../../services/api/coupon-endpoint.service';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {Coupon} from '../../../../types/api/coupon';

@Component({
    selector: 'app-admin-coupon-list',
    templateUrl: './admin-coupon-list.component.html'
})
export class AdminCouponListComponent implements OnInit {

    readonly NOW: Date = new Date();

    private coupons$: Observable<[Date, Coupon]>;

    constructor(private couponService: CouponEndpointService) {
        this.coupons$ = couponService.all()
            .pipe(
                map(coupons => coupons.map(
                    (c) => [new Date(c.expiration_date), c]
                    ).sort((a: [Date, Coupon], b: [Date, Coupon]) => b[0].getTime() - a[0].getTime())
                ),
                tap(console.log),
            );
    }

    ngOnInit() {
    }

}
