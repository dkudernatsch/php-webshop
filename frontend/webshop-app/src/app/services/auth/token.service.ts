import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';


@Injectable()
export class TokenService {

    constructor() {
        this.subject.next();
    }

    private subject = new Subject<Token>();

    public login(username: string, password: string) {
        this.subject.next({data: username + password, expires: 1});
    }

    public getToken(): Observable<Token> {
        return this.subject.asObservable();
    }
}


interface Token {
    data: string;
    expires: number;
}
