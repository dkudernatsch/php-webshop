import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, zip} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, flatMap, map, merge} from 'rxjs/operators';
import {Category, Product} from '../../../types/api/product';
import {ProductEndpointService} from '../../../services/api/product-endpoint.service';

@Component({
    selector: 'app-search-product',
    templateUrl: './search-product-comp.html'
})
export class SearchProductComponent {

    @ViewChild('instance') instance: NgbTypeahead;

    @Input() activeCategory$: Observable<Category>;

    constructor(private productService: ProductEndpointService) {

    }


    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    formatter = (result: Product) => result.name;

    search: (text$: Observable<string>) => Observable<Product[]>
        = (text$: Observable<string>) =>
            zip(
                text$.pipe(
                    debounceTime(200),
                    distinctUntilChanged(),
                    merge(this.focus$),
                    merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
                    map((s: string) => s.toLowerCase())
                ),
                this.activeCategory$
            ).pipe(
                flatMap(([text, category]) => this.productService.byCategorySearch(category.id, text))
            )

}
