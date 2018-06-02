import {Injectable} from '@angular/core';
import {LocalStorageService} from './localstorage.service';
import {isDate, isNumber, isString} from 'util';
import {Observable, of} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import {isNumeric} from 'rxjs/internal-compatibility';


@Injectable({
    providedIn: 'root'
})
export class RequestCacheService {


    constructor(private localStorageService: LocalStorageService) {
    }

    public cacheObservable<T>(key: string, toCache: Observable<T>, expires: Date, expireFn: (t: T) => Date | null = null): Observable<T> {
        console.log('caching new entry: ' + key);
        return this.localStorageService.getItem<CacheEntry<T>>(key)
            .pipe(
                map((entry: CacheEntry<T>) => {
                    if (entry) {
                        console.log(entry);
                        if (new Date(entry.expires) > new Date()) {
                            console.log('found non expired entry');
                            return entry;
                        } else {
                            console.log('entry is expired');
                            return null;
                        }
                    } else {
                        console.log('no cached value found');
                        return null;
                    }
                }),
                flatMap((entry: CacheEntry<T> | null) => {
                        if (entry !== null) {
                            console.log('cache val exists:');
                            console.log(entry);
                            return of(entry.data);
                        } else {
                            // place observable into cache
                            return toCache.pipe(
                                flatMap(
                                    (val: T) => {
                                        return this.placeValue(key, val, expires, expireFn);
                                    }
                                ),
                                map((centry: CacheEntry<T>) => centry.data)
                            );
                        }
                    }
                ));
    }

    invalidate(key: string) {
        localStorage.removeItem(key);
    }

    placeValue<T>(key: string, toCache: T, expires: Date, expireFn: (t: T) => Date | null = null): Observable<CacheEntry<T>> {

        console.log('placing new val in cache');

        if (expireFn !== null) {
            expires = expireFn(toCache);
            console.log('new expiry : ');
            console.log(expires);
        }

        return this.localStorageService.setItem<CacheEntry<T>>(key, {
            data: toCache,
            expires: expires,
        });
    }


}

interface CacheEntry<T> {
    data: T;
    expires: Date;
}
