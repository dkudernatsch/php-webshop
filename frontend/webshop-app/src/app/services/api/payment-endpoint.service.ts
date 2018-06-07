import {Observable} from 'rxjs/internal/Observable';
import {NewPaymentMethod, PaymentMethod} from '../../types/api/user';
import {HttpRequestorService} from './http-requestor.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PaymentEndpointService {

    constructor(private requestor: HttpRequestorService) {}

    getPaymentMethods(userId: number): Observable<PaymentMethod[]> {
        return this.requestor.request<PaymentMethod[]>({
            resource: `user/${userId}/paymentMethod/`,
            scope: ['user'],
            method: 'GET',
            body: {}
        });
    }

    addPaymentMethod(newPM: NewPaymentMethod, userId: number): Observable<null> {
        return this.requestor.request<null>({
            resource: `user/${userId}/paymentMethod/`,
            scope: ['user'],
            method: 'POST',
            body: {newPM}
        });
    }

    deletePaymentMethod(userId: number, pmID: number): Observable<null> {
        return this.requestor.request<null>({
            resource: `user/${userId}/paymentMethod/${pmID}`,
            scope: ['user'],
            method: 'DELETE',
            body: {}
        });
    }
}
