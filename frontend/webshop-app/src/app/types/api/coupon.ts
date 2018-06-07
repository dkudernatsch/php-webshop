
export interface Coupon {
    id: number;
    code: string;
    value: number;
    user_id: number;
}

export interface NewCoupon {
    value: number;
    code: string;
    user_id: number;
}


