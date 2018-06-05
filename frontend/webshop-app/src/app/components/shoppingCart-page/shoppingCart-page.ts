import {Component} from '@angular/core';
import {ShoppingCartService} from '../../services/products/shoppingCart.service';
import {Observable} from 'rxjs/internal/Observable';
import {UserAuthService} from '../../services/auth/user-auth.service';

@Component({
    selector: 'app-shoppingCart-page',
    templateUrl: './shoppingCart-page-comp.html'
})
export class ShoppingCartPageComponent {

    total: Observable<number>;
    private isUser$;

    constructor(private shoppingCartService: ShoppingCartService,
                private userAuthService: UserAuthService) {
        this.total = this.shoppingCartService.getTotalPrice();
        this.isUser$ = userAuthService.hasScope('user');
    }

}
