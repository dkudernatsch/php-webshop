import {Component} from '@angular/core';
import {Product} from '../../../types/product';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {ShoppingCartService} from '../../../services/products/shoppingCart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product-comp.html',
    providers: [NgbRatingConfig]
})
export class ProductComponent {
    constructor(private config: NgbRatingConfig,
                private shoppingCartService: ShoppingCartService) {
        config.max = 5;
        // changing rating not possible with this
        // config.readonly = true;
    }

    testProduct: Product = {
        id: 1,
        name: 'Knuesperli',
        price: 3,
        imagePath: 'assets/images/knuesperli_schoko_banane.png',
        rating: 4,
        categories: [1]
    };

    onAddToCart() {
        this.shoppingCartService.addProduct(this.testProduct);
    }


}
