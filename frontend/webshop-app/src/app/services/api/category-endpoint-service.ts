import {Injectable} from '@angular/core';
import {Category, NewCategory} from '../../types/api/product';
import {ApiResourceEndPoint} from './api-resource-end-point';
import {HttpRequestorService} from './http-requestor.service';
import {Scope} from '../../types/api/user';
import {CommonEndPoints} from '../../types/api-request';

@Injectable(
    {providedIn: 'root'}
)
export class CategoryEndpointService extends ApiResourceEndPoint<Category, NewCategory> {

    constructor(protected requestor: HttpRequestorService) {
        super(requestor);
    }

    getEndPoints(): CommonEndPoints {
        return {
            all: {
                resource: 'category/',
                scope: ['anonymous'],
                method: 'GET',
            },
            byId: {
                resource: 'category/',
                scope: ['anonymous'],
                method: 'GET',
            },
            create: {
                resource: 'category/',
                scope: ['admin'],
                method: 'POST',
            }
        };
    }

}
