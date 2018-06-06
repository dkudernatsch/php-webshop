import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiRequest, ApiResponse, isFailedResponse, isSuccessResponse} from '../../types/api-request';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestorService {

    private readonly apiUrl = 'https://api.webshop.at';



    constructor(private http: HttpClient) {
    }

    public request<T>(request: ApiRequest<T>): Observable<T> {
        return this.sendRequest(request).pipe(
            map((response: ApiResponse<T>) => {
                if (isFailedResponse(response)) {
                    throw new Error('Request failed please try again');
                }
                if (isSuccessResponse(response)) {
                    return response.success;
                }
            })
        );
    }

    private sendRequest<T>(request: ApiRequest<T>): Observable<ApiResponse<T>> {
        switch (request.method) {
            case 'GET'    :
                return this.http.get   <ApiResponse<T>>(this.apiUrl + '/' + request.resource, {});
            case 'POST'   :
                return this.http.post  <ApiResponse<T>>(this.apiUrl + '/' + request.resource, request.body);
            case 'PUT'    :
                return this.http.put   <ApiResponse<T>>(this.apiUrl + '/' + request.resource, request.body);
            case 'DELETE' :
                return this.http.delete<ApiResponse<T>>(this.apiUrl + '/' + request.resource, {});
        }
    }
}
