import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../types/api/product';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list-comp.html',
    styleUrls: ['product-list.css']
})
export class ProductListComponent implements OnInit {

    private actualProducts: Product[] = [];

    @Input() public productList$;

    constructor() {
    }

    ngOnInit(): void {
        this.productList$.subscribe((p) => this.actualProducts = p);
    }

}
