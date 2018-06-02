import {Component} from '@angular/core';
import {Category} from '../../../types/product';

@Component({
    selector: 'app-category-picker',
    templateUrl: './category-picker-comp.html'
})
export class CategoryPickerComponent {
    actualCategory: Category;
    categories: Category[] = [
        {id: 1, name: 'healthy', slug: 'h'},
        {id: 2, name: 'tasty', slug: 't'}
    ];

    constructor() {
        this.actualCategory = this.categories[1];
    }

}
