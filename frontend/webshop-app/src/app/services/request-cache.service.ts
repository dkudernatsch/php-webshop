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

    public cacheObservable<T>(key: string, toCache: Observable<T>, expires: Date): Observable<T> {
        console.log('caching new entry: ' + key);
        return this.localStorageService.getItem<CacheEntry<T>>(key)
            .pipe(
                map((entry: CacheEntry<T>) => {
                    if (entry) {
                        return entry.expires >= new Date() ? entry : null;
                    } else {
                        console.log('original cache val is null or expired');
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
                        return toCache.pipe(flatMap(
                                (val: T) => {
                                    return this.placeValue(key, val, expires);
                                }
                            )
                        );
                    }
                }
            ));
    }

    placeValue<T>(key: string, toCache: T, expires: Date): Observable<CacheEntry<T>> {

        console.log('placing new val in cache');

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
