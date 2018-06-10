
export interface Coupon {
    id: number;
    code: string;
    value: number;
    expiration_date: string;
    user_id: number | null;
}
export interface NewCoupon {
    value: number;
    expiration_date: string;
}

export interface Id {
    id: number;
}

export interface NewCoupon {
    value: number;
    code: string;
    user_id: number;
}


