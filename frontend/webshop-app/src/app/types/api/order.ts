export interface OrderItem {
    id: number,
    count: number
}

export interface Order {
    user_id: number,
    payment_id: number,
    coupon_id: number | null,
    products: [
        OrderItem
        ]
}

export interface Invoice {
    id: number;
    invoiceNumber: string;
    sum: number;
    timeStamp: string;
    user_id: number;
    orderPositions: OrderPosition[];
}

export interface OrderPosition {
    id: number;
    count: number;
    product: number;
}