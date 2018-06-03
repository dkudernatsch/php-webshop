import {Observable} from 'rxjs/internal/Observable';
import {ApiEndpoint, ApiRequest, CommonEndPoints} from '../../types/api-request';
import {HttpRequestorService} from './http-requestor.service';
import {map} from 'rxjs/operators';

export abstract class ApiResourceEndPoint<T, NewT> {

    protected constructor(protected requestor: HttpRequestorService) {
    }

    abstract getEndPoints(): CommonEndPoints;

    byId(id: number): Observable<T> {

        const endpoint: ApiEndpoint = this.getEndPoints().byId;

        const request: ApiRequest<T> = {
            resource: endpoint.resource + id,
            method: endpoint.method,
            scope: endpoint.scope,
            body: {}
        };
        return this.requestor.request(request);
    }

    all(): Observable<T[]> {
        const endpoint: ApiEndpoint = this.getEndPoints().all;

        const request: ApiRequest<T[]> = {
            resource: `${endpoint.resource}`,
            method: endpoint.method,
            scope: endpoint.scope,
            body: {}
        };
        return this.requestor.request(request);
    }

    create(t: NewT): Observable<void> {
        const endpoint: ApiEndpoint = this.getEndPoints().create;

        const request: ApiRequest<void> = {
            resource: `${endpoint.resource}`,
            method: endpoint.method,
            scope: endpoint.scope,
            body: t
        };
        return this.requestor.request(request);
    }

}


