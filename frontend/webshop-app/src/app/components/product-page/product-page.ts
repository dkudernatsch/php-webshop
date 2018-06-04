import {Component, ViewChild} from '@angular/core';
import {CategoryPickerComponent} from './category-picker/category-picker.component';
import {Observable} from 'rxjs/internal/Observable';
import {Category} from '../../types/api/product';
import {SearchProductComponent} from './searchbar/search-product.component';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page-comp.html'
})
export class ProductPageComponent {

    constructor() {}

    activeCategory$: Observable<Category>;
    productSearchString: Observable<string>;

    @ViewChild(CategoryPickerComponent)
    set categoryPicker(component: CategoryPickerComponent) {
        this.activeCategory$ = component.activeCategory$;
    }

    @ViewChild(SearchProductComponent)
    set searchProduct(component: SearchProductComponent) {
        this.productSearchString = null;
    }

}

