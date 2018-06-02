
export interface Coupon {
    id: number;
    code: string;
    value: number;
    user_id: number;
}

export class CouponTypeGuard implements TypeGuard<Coupon> {
    is(val: any): val is Coupon {
        return val.id !== undefined
            && val.code !== undefined
            && val.value !== undefined
            && val.user_id !== undefined;
    }
}
