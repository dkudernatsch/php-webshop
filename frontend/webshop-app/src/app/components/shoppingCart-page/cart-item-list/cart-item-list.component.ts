import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../../services/products/shoppingCart.service';
import {CartEntry, Product} from '../../../types/api/product';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';


@Component({
    selector: 'app-cart-item-list',
    templateUrl: './cart-item-list-comp.html',
})

export class CartItemListComponent {

    private cart: Observable<CartEntry[]>;

    constructor(private shoppingCartService: ShoppingCartService) {
        this.cart = this.shoppingCartService.cart().pipe(
            map((data) => {
                return Object.keys(data).map(key => data[key]);
            })
        );
    }

}
