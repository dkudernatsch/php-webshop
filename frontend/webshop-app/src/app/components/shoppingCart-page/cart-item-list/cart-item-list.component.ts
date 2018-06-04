import {Component} from '@angular/core';
import {ShoppingCartService} from '../../../services/products/shoppingCart.service';
import {Product} from '../../../types/api/product';


@Component({
    selector: 'app-cart-item-list',
    templateUrl: './cart-item-list-comp.html',
})

export class CartItemListComponent {

    private currentCartItems: Product[] = [];

    constructor(private shoppingCartService: ShoppingCartService) {
        this.currentCartItems = this.shoppingCartService.getAllItems();
    }

    getAmountFor(product: Product): number {
        return this.shoppingCartService.getAmountFor(product.id);
    }

}
