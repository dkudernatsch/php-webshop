import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {isNull} from 'util';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {
    }

    getItem<T>(key: string): Observable<any> {
        const elem = localStorage.getItem(key);
        return of<T>(elem ? JSON.parse(elem) : null);
    }

    setItem<T>(key: string, value: T): Observable<T> {
        console.log('storing new val in local storage');
        localStorage.setItem(key, JSON.stringify(value));
        return new Observable(
            (e) => {
                e.next(value);
                e.complete();
            }
        );
    }

}
