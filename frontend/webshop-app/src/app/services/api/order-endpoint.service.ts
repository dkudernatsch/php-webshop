import {Observable} from 'rxjs';
import {HttpRequestorService} from './http-requestor.service';
import {Injectable} from '@angular/core';
import {Order} from "../../types/api/order";

@Injectable()
export class OrderEndpointService {

    constructor(private requestor: HttpRequestorService) {}

    placeOrder(order: Order): Observable<any> {
        return this.requestor.request({
            resource: `order/`,
            scope: ['user'],
            method: 'POST',
            body: order
        });
    }
}
