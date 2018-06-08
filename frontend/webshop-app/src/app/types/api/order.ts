
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
