import {Component, EventEmitter, Output} from '@angular/core';
import {CategoryEndpointService} from '../../../services/api/category-endpoint-service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Category} from '../../../types/api/product';

@Component({
    selector: 'app-category-picker',
    templateUrl: './category-picker-comp.html'
})
export class CategoryPickerComponent {
    categories$: Observable<Category[]>;

    categoryField: FormControl = new FormControl();

    public activeCategory$: Observable<Category>;

    constructor(private categoryService: CategoryEndpointService) {
        this.categories$ = this.categoryService.all();
        this.activeCategory$ = this.categoryField.valueChanges;
    }

}
