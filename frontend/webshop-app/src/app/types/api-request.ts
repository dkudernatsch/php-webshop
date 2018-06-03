import {Scope} from './api/user';


export type HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';


export interface CommonEndPoints {
    all: ApiEndpoint;
    byId: ApiEndpoint;
    create: ApiEndpoint;
}

export interface ApiEndpoint {
    resource: string;
    scope: Scope[];
    method: HttpMethod;
}

export interface ApiRequest<T> {
    resource: string;
    scope: Scope[];
    method: HttpMethod;
    body: any;
}


export type ApiResponse<T>
    = SuccessfulResponse<T>
    | FailedResponse;

export interface FailedResponse {
    kind: 'failed';
    error: string;
}

export function isFailedResponse<T>(val: ApiResponse<T>): val is FailedResponse {
    return val.kind === 'failed' || 'error' in val;
}

export interface SuccessfulResponse<T> {
    kind: 'success';
    success: T;
}

export function isSuccessResponse<T>(val: ApiResponse<T>): val is SuccessfulResponse<T> {
    return val.kind === 'success' || 'success' in val;
}
