import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiRequest, ApiResponse, isFailedResponse, isSuccessResponse} from '../../types/api-request';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Error} from 'tslint/lib/error';
import {MessageModalService} from '../message-modal/message-modal.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageModalComponent} from '../../components/message-modal/message-modal.component';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestorService {

    private readonly apiUrl = 'https://api.webshop.at';

    constructor(private http: HttpClient,
                private messageModalService: MessageModalService,
                private modalService: NgbModal) {
    }

    public request<T>(request: ApiRequest<T>): Observable<T> {
        return this.sendRequest(request).pipe(
            catchError(
                (err, obs) =>  {this.openErrorModal('Error', 'Oops something went wrong!');
                    return obs;
                }
            ),
            map(
                (response: ApiResponse<T>) => {
                if (response === null
                || response === undefined) {
                    return null;
                }
                if (isFailedResponse(response)) {
                    this.openErrorModal('Error', 'Oops something went wrong!');
                }
                if (isSuccessResponse<T>(response)) {
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

    openErrorModal(title: string, body: string) {
        this.messageModalService.setTitle(title);
        this.messageModalService.setMessage(body);
        const modalRef = this.modalService.open(MessageModalComponent);
    }
}
