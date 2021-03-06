import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {ShoppingCartService} from '../../../services/products/shoppingCart.service';
import {CartEntry, Product} from '../../../types/api/product';


@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item-comp.html',
})
export class CartItemComponent {
    @Input() cartentry: CartEntry;
    private dropDownValues = [1, 2, 3, 4, 5, 6, 7, 8];

    constructor(private shoppingCartService: ShoppingCartService) {
    }

    onRemoveFromCart() {
        this.shoppingCartService.removeProduct(this.cartentry.product);
    }

    onChangeAmount(newAmount: any) {
        // super important!
        newAmount = parseInt(newAmount, 10);
        this.shoppingCartService.setAmountFor(this.cartentry.product, newAmount);
    }


}
