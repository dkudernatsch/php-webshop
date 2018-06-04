import {Component} from '@angular/core';
import {Product} from '../../../types/api/product';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list-comp.html',
    styleUrls: ['product-list.css']
})
export class ProductListComponent {

    private actualProducts: Product[] = [];

    testProduct: Product = {
        id: 1,
        name: 'Knuesperli',
        price: 3,
        imagePath: 'assets/images/knuesperli_schoko_banane.png',
        rating: 4,
        categories: [1]
    };

    testProduct2: Product = {
        id: 2,
        name: 'Knuesperli2',
        price: 33,
        imagePath: 'assets/images/knuesperli_schoko_banane.png',
        rating: 2,
        categories: [2]
    };

    constructor() {
        this.actualProducts.push(this.testProduct);
        this.actualProducts.push(this.testProduct2);
    }

    getActualProducts(): Product[] {
        return this.actualProducts;
    }

}
