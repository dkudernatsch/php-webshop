import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbTypeahead, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, zip} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, flatMap, map, merge} from 'rxjs/operators';
import {Category, Product} from '../../../types/api/product';
import {ProductEndpointService} from '../../../services/api/product-endpoint.service';
import {tap} from "rxjs/operators";
import {pluck, publishReplay, switchMap} from "rxjs/internal/operators";

@Component({
    selector: 'app-search-product',
    templateUrl: './search-product-comp.html'
})
export class SearchProductComponent implements OnInit {

    @ViewChild('instance') instance: NgbTypeahead;

    @Input() productList$: Observable<Product[]>;

    constructor(private productService: ProductEndpointService) {
    }

    model: string;

    @Output() searchEvent = new EventEmitter();

    ngOnInit(): void {
        this.productList$.subscribe((_) => this.model = '')
    }

    onSelectItem(event: NgbTypeaheadSelectItemEvent){
        this.searchEvent.emit(event.item);
    }

    formatter = (result: Product) => result.name;

    search//: (text$: Observable<string>) => Observable<Product[]>
        = (text$: Observable<string>) =>
            text$.pipe(
                    debounceTime(200),
                    distinctUntilChanged(),
                    map((s: string) => s.toLowerCase()),
                    switchMap((str) =>
                        this.productList$.pipe(
                            map((products: Product[]) => products.filter(
                                (p) => p.name.toLowerCase().indexOf(str) > -1
                            ))
                        )
                    )
                );


}
