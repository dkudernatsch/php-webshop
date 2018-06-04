import {Component} from '@angular/core';
import {ShoppingCartService} from '../../services/products/shoppingCart.service';
import {Observable} from 'rxjs/internal/Observable';

@Component({
    selector: 'app-shoppingCart-page',
    templateUrl: './shoppingCart-page-comp.html'
})
export class ShoppingCartPageComponent {

    total: Observable<number>;

    constructor(private shoppingCartService: ShoppingCartService) {
        this.total = this.shoppingCartService.getTotalPrice();
    }

}
