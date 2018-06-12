import {Component, HostListener} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {ShoppingCartService} from './services/products/shoppingCart.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authService: AuthService,
                private shoppingCartService: ShoppingCartService) {
        this.authService.updateAuth({}, false);
    }

    title = 'app';

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler(event) {
        this.shoppingCartService.saveInLocalStorage();
        if (localStorage.getItem('stay-logged-in') === 'false') {
            this.authService.updateAuth({}, true);
        }
    }

}
