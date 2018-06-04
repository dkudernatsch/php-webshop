import {CartEntry, Product} from '../../types/api/product';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";

export class ShoppingCartService {



    // workaround for a map id => amount
    private cart: Map<number, CartEntry>;
    private totalItems = 0;
    private sum = 0;
    // make subject private so not everyone that uses service can call next on it!
    private cartSubject = new BehaviorSubject<Map<number, CartEntry>>(this.cart);
    private sumSubject = new BehaviorSubject<number>(this.sum);

    // function to be able to subscribe to the Cart
    cart(): Observable<Map<number, CartEntry>> {
        return this.cartSubject.asObservable();
    }

    // function to be able to subscribe to the Cart
    sum(): Observable<number> {
        return this.sumSubject.asObservable();
    }

    // can be called from outside and emits .next fo all Subscribers (who took the cart with cart())
    addProduct(product: Product): void {
        if (this.cart[product.id]) {
            // console.log('cart already contains that item. increasing amount');
            this.cart[product.id].amount++;
        } else {
            this.cart[product.id] = {product: product, amount: 1}
        }
        this.totalItems++;
        this.calcTotalPrice();
        // need to recalculate sum
        this.sumSubject.next(this.sumSubject);
        this.cartSubject.next(this.cart);
    }

    // can be called from outside and emits .next fo all Subscribers (who took the cart with cart())
    // removes product completely
    removeProduct(product: Product): void {
        if(this.cart[product.id]) {
            delete this.cart[product.id];
        }
        this.cartSubject.next(this.cart);
        //need to recalculate sum
        this.calcTotalPrice();
        this.sumSubject.next(this.sumSubject);
    }

    // can be called from outside and emits .next fo all Subscribers (who took the cart with cart())
    setAmountFor(product: Product, newAmount: number): void {
        // console.log("setting amount");
        if(this.cart[product.id]) {
            this.cart[product.id].amount = newAmount;
            // console.log("set amount");
        }
        this.cartSubject.next(this.cart);
        // need to recalculate sum
        this.calcTotalPrice();
        this.sumSubject.next(this.sumSubject);
    }

    getCart(): { [id: number]: CartEntry } {
        return this.cart;
    }

    private calcTotalPrice(): number {
        let sum = 0;
        for(let key in this.cart) {
            sum += this.cart[key].amount * this.cart[key].product.price;
        }
        return sum;
    }


}
