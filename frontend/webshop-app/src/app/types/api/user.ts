
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

export interface NewUser {
    username: string;
    password: string;
    mail: string;
    appellation: string;
    first_name: string;
    last_name: string;
    address: string;
    post_code: string;
    city: string;
}

export interface RegisterNew {
    user: NewUser;
}


export type Scope
    = 'user'
    | 'admin'
    | 'anonymous';

export function isScope(val: any): val is Scope {
    return val === 'user'
        || val === 'admin'
        || val === 'anonymous';
}

export interface PaymentMethod {
    id: number;
    method: string;
}
