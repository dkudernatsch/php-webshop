import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CouponEndpointService} from '../../../../services/api/coupon-endpoint.service';
import {flatMap} from 'rxjs/operators';
import {Coupon, Id} from '../../../../types/api/coupon';

@Component({
    selector: 'app-create-coupon',
    templateUrl: './create-coupon.component.html'
})
export class CreateCouponComponent implements OnInit {

    constructor(private couponService: CouponEndpointService) {
    }

    model: NgbDateStruct;
    value: number;

    createdCoupons: Coupon[] = [];

    ngOnInit() {
    }

    closeCreatedCoupon(coupon: Coupon) {
        this.createdCoupons = this.createdCoupons
            .filter((c) => c.id !== coupon.id);
    }

    onSubmit() {
        console.log(this.model);
        console.log(this.value);

        const date = new Date(this.model.year,
                            this.model.month,
                            this.model.day, 23, 59, 59).toISOString();
        console.log(date);
        this.couponService.create({
            value: this.value,
            expiration_date: date
        }).pipe(
            flatMap((id: Id) => this.couponService.byId(id.id))
        ).subscribe(
            (c: Coupon) => this.createdCoupons.push(c)
        );

    }
}
