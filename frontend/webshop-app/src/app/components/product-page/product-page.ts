import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryPickerComponent} from './category-picker/category-picker.component';
import {Observable, ReplaySubject, zip} from 'rxjs';
import {flatMap, publishLast} from 'rxjs/operators';
import {Category, Product} from '../../types/api/product';
import {SearchProductComponent} from './searchbar/search-product.component';
import {ProductEndpointService} from "../../services/api/product-endpoint.service";

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page-comp.html'
})
export class ProductPageComponent implements OnInit{

    constructor(private productService: ProductEndpointService) {
    }

    productList$: ReplaySubject<Product[]> = new ReplaySubject(1);

    activeCategory$: Observable<Category>;
    productSearchString$: Observable<string>;

    @ViewChild(CategoryPickerComponent)
    set categoryPicker(component: CategoryPickerComponent) {
        this.activeCategory$ = component.activeCategory$;
    }

    @ViewChild(SearchProductComponent)
    set searchProduct(component: SearchProductComponent) {
        this.productSearchString$ = null;
    }

    onSearch(event){
        this.productList$.next([event]);
    }

    ngOnInit(): void {
        this.activeCategory$.subscribe( (cat) => {
                this.productService.byCategorySearch(cat.id, '')
                    .subscribe((ps) => this.productList$.next(ps))
            }
        );
    }
}

