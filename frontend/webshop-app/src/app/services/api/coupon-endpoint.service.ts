import {Observable} from 'rxjs/internal/Observable';
import {HttpRequestorService} from './http-requestor.service';
import {Injectable} from '@angular/core';
import {Coupon, NewCoupon} from '../../types/api/coupon';

@Injectable()
export class CouponEndpointService {

    constructor(private requestor: HttpRequestorService) {}

    getCoupon(couponId: number): Observable<Coupon> {
        return this.requestor.request({
            resource: `coupon/${couponId}`,
            scope: ['user'],
            method: 'GET',
            body: {}
        });
    }

    addCoupon(newCoupon: NewCoupon): Observable<null> {
        return this.requestor.request({
            resource: `coupon/`,
            scope: ['admin'],
            method: 'POST',
            body: {newCoupon}
        });
    }

    updateCoupon(coupon: Coupon): Observable<Coupon> {
        return this.requestor.request({
            resource: `coupon/`,
            scope: ['user'],
            method: 'PUT',
            body: {coupon}
        });
    }

    // TODO will be available?
    deleteCoupon(couponID: number): Observable<null> {
        return this.requestor.request({
            resource: `coupon/${couponID}`,
            scope: ['admin'],
            method: 'DELETE',
            body: {}
        });
    }
}
