import {Component, Input, ViewChild} from '@angular/core';
import {Product} from '../../../types/product';
import {ShoppingCartService} from '../../../services/products/shoppingCart.service';


@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item-comp.html',
})
export class CartItemComponent {
    @Input() product: Product;
    @Input() amount: number;
    private dropDownValues = [1, 2, 3, 4, 5, 6, 7, 8];

    constructor(private shoppingCartService: ShoppingCartService) {}

    onRemoveFromCart() {
        this.shoppingCartService.removeProduct(this.product);
    }

    onChangeAmount(newAmount: number) {
        console.log('newAmount: ' + newAmount);
        this.shoppingCartService.setAmountFor(this.product, newAmount);
    }

}
