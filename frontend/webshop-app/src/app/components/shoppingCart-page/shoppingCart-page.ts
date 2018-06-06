import {Component} from '@angular/core';
import {ShoppingCartService} from '../../services/products/shoppingCart.service';
import {Observable} from 'rxjs/internal/Observable';
import {UserAuthService} from '../../services/auth/user-auth.service';
import {PayingModalComponent} from './payingModal/paying-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-shoppingCart-page',
    templateUrl: './shoppingCart-page-comp.html'
})
export class ShoppingCartPageComponent {

    total: Observable<number>;
    private isUser$;

    constructor(private shoppingCartService: ShoppingCartService,
                private userAuthService: UserAuthService,
                private modalService: NgbModal) {
        this.total = this.shoppingCartService.getTotalPrice();
        this.isUser$ = userAuthService.hasScope('user');
    }

    onBuyProducts() {
        console.log('opening buying modal');
        const modalRef = this.modalService.open(PayingModalComponent);
    }

    // TODO: implement routing when logging in or out -> stay on cart when logging in!!

}
