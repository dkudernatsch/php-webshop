import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CategoryEndpointService} from '../../../services/api/category-endpoint-service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../../types/api/product';

@Component({
    selector: 'app-category-picker',
    templateUrl: './category-picker-comp.html'
})
export class CategoryPickerComponent {

    @ViewChild("select") selectTag: HTMLSelectElement;

    categories$: Observable<Category[]>;

    cat: Category;

    categoryField: FormControl = new FormControl();

    public activeCategory$: Observable<Category>;

    constructor(private categoryService: CategoryEndpointService) {
        this.categories$ = this.categoryService.all();
        this.activeCategory$ = this.categoryField.valueChanges;
        this.categories$.subscribe((cats) => this.cat = cats[0]);
    }


    compCategory(cat1: Category, cat2: Category){
        return cat1 && cat2 ? cat1.id === cat2.id : cat1 === cat2;
    }

}
