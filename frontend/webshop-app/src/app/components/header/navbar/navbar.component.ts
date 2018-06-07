import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {UserAuthService} from '../../../services/auth/user-auth.service';
import {Observable} from 'rxjs';
import {ShoppingCartService} from '../../../services/products/shoppingCart.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar-comp.html',
    styleUrls: ['navbar-comp.css']
})
export class NavbarComponent {
    private isUser$: Observable<Boolean>;
    private isAdmin$: Observable<Boolean>;
    private isAnonymous$: Observable<Boolean>;

    private itemNumber$: Observable<number>;

    constructor(private userAuthService: UserAuthService,
                private authService: AuthService,
                private shoppingCartService: ShoppingCartService) {
        this.isAdmin$ = userAuthService.hasScope('admin');
        this.isUser$ = userAuthService.hasScope('user');
        this.isAnonymous$ = userAuthService.hasScope('anonymous');
        this.itemNumber$ = this.shoppingCartService.getAmountOfItems();
    }
}
