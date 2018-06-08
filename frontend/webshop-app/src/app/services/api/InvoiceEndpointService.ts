import {HttpRequestorService} from './http-requestor.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Invoice} from '../../types/api/order';

@Injectable({
    providedIn: 'root'
})
export class InvoiceEndpointService {
    constructor(protected requestor: HttpRequestorService) {
    }

    allByUser(userId: number): Observable<Invoice[]> {
        return this.requestor.request<Invoice[]>({
            method: 'GET',
            resource: `user/${userId}/invoice/`,
            scope: ['user'],
            body: {},
        });
    }

    removeOrderPosition(invoice_id: number, orderPosition_id: number): Observable<null> {
        return this.requestor.request<null>({
            method: 'DELETE',
            resource: `invoice/${invoice_id}/position/${orderPosition_id}`,
            scope: ['admin'],
            body: {},
        });
    }
}
