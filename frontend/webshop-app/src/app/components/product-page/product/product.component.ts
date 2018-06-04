import {Component, Input} from '@angular/core';
import {Product} from '../../../types/api/product';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {ShoppingCartService} from '../../../services/products/shoppingCart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product-comp.html',
    providers: [NgbRatingConfig]
})
export class ProductComponent {

    @Input() product: Product;

    constructor(private config: NgbRatingConfig,
                private shoppingCartService: ShoppingCartService) {
        config.max = 5;
        // changing rating not possible with this
        // config.readonly = true;
    }

    onAddToCart() {
        this.shoppingCartService.addProduct(this.product);
        console.log('added to cart');
        console.log(this.shoppingCartService.getAllItems());
    }

}
