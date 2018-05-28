import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class TokenService {

    private readonly resourceString: string = 'https://api.webshop.at/token/';

    constructor(private http: HttpClient) {
    }

    public requestToken(credentials: Credentials): Observable<HttpResponse<Token>> {
        if (<UserCredentials>credentials) {
            return this.http.post(this.resourceString, credentials);
        } else {
            return this.http.post(this.resourceString);
        }
    }
}
