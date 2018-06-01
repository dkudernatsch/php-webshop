export interface User {
    id: number;
    username: string;
    mail: string;
    appellation: string;
    first_name: string;
    last_name: string;
    address: string;
    post_code: string;
    city: string;
    is_admin: boolean;
}

export interface PaymentMethod {
    id: number;
    method: string;
}

export class PaymentTypeGuard implements TypeGuard<PaymentMethod> {
    is(val: any): val is PaymentMethod {
        return val.id !== undefined
            && val.methof !== undefined;
    }
}

export class UserTypeGuard implements TypeGuard<User> {
    is(val: any): val is User {
        return val.id !== undefined
            && val.username !== undefined
            && val.mail !== undefined
            && val.appellation !== undefined
            && val.first_name !== undefined
            && val.last_name !== undefined
            && val.address !== undefined
            && val.post_code !== undefined
            && val.city !== undefined
            && val.is_admin !== undefined;
    }
}
