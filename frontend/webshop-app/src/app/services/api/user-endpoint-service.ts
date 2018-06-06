import {Injectable} from '@angular/core';
import {ApiResourceEndPoint} from './api-resource-end-point';
import {HttpRequestorService} from './http-requestor.service';
import {User, RegisterNew, NewUser} from '../../types/api/user';
import {CommonEndPoints} from '../../types/api-request';

@Injectable(
    {providedIn: 'root'}
)
export class UserEndpointService extends ApiResourceEndPoint<User, RegisterNew> {

    private endpoints: CommonEndPoints = {
        all: {
            resource: 'user/',
            scope: ['admin'],
            method: 'GET',
        },
        byId: {
            resource: 'user/',
            scope: ['user'],
            method: 'GET',
        },
        create: {
            resource: 'user/',
            scope: ['anonymous'],
            method: 'POST',
        }
    };

    constructor(protected requestor: HttpRequestorService) {
        super(requestor);
    }

    getEndPoints(): CommonEndPoints {
        return this.endpoints;
    }

    updateUser(user: User) {
        return this.requestor.request({
            resource: `user/${user.id}`,
            scope: ['user'],
            method: 'PUT',
            body: {user}
        });
    }

}
