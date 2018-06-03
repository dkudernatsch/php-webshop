import {Injectable} from '@angular/core';
import {NewProduct, Product} from '../../types/api/product';
import {ApiResourceEndPoint} from './api-resource-end-point';
import {HttpRequestorService} from './http-requestor.service';
import {ApiRequest, CommonEndPoints} from '../../types/api-request';
import {Observable} from 'rxjs';

@Injectable(
    {providedIn: 'root'}
)
export class ProductEndpointService extends ApiResourceEndPoint<Product, NewProduct> {

    private endpoints: CommonEndPoints = {
        all: {
            resource: 'product/',
            scope: ['anonymous'],
            method: 'GET',
        },
        byId: {
            resource: 'product/',
            scope: ['anonymous'],
            method: 'GET',
        },
        create: {
            resource: 'product/',
            scope: ['admin'],
            method: 'POST',
        }
    };

    constructor(protected requestor: HttpRequestorService) {
        super(requestor);
    }

    getEndPoints(): CommonEndPoints {
        return this.endpoints;
    }

    byCategory(cat_id: number): Observable<Product[]> {
        return this.requestor.request<Product[]>(
            {
                resource: 'product/category/' + cat_id,
                scope: ['anonymous'],
                method: 'GET'
            }
        );
    }

}
