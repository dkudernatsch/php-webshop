import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../../services/products/shoppingCart.service';
import {CartEntry, Product} from '../../../types/api/product';


@Component({
    selector: 'app-cart-item-list',
    templateUrl: './cart-item-list-comp.html',
})

export class CartItemListComponent {

    private cartEntries: CartEntry[];

    constructor(private shoppingCartService: ShoppingCartService) {
        this.cartEntries = this.shoppingCartService.getAllCartItems();
    }

}
