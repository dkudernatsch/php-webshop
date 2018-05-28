import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Subscriber} from 'rxjs/internal-compatibility';

@Injectable()
export class TokenStoreService {

    public getToken(): Observable<Token> {

        const obs = new Observable(
            (observer) => {
                const token = localStorage.getItem('userToken');
                if (token) {
                    observer.next(JSON.parse<Token>(token));
                } else {
                    observer.error();
                }
                observer.complete();
            }
        );

        localStorage.getItem('userToken');
    }
}
