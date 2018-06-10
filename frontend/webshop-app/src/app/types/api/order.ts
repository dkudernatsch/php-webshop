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

