import {CartEntry, Product} from '../../types/api/product';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';
import {map, tap} from 'rxjs/operators';
import {OrderItem} from "../../types/api/order";

export class ShoppingCartService {

    // workaround for a map id => amount
    private cart: Map<number, CartEntry> = new Map();
    // make subject private so not everyone that uses service can call next on it!
    private cartSubject = new BehaviorSubject<Map<number, CartEntry>>(this.cart);

    // function to be able to subscribe to the Cart
    subscribeCart(): Observable<Map<number, CartEntry>> {
        return this.cartSubject.asObservable();
    }

    // function to be able to subscribe to the total value of the cart
    getTotalPrice(): Observable<number> {
        return this.cartSubject.asObservable().pipe(
            map((cart: Map<number, CartEntry>) =>
                Object.keys(cart).reduce((sum: number, key: string) =>
                    sum + (cart[key].product.price * cart[key].amount), 0
                )
            ),
            tap((a) => console.log(a))
        );
    }

    // function to be able to subscribe to the item-amount
    getAmountOfItems(): Observable<number> {
        return this.cartSubject.asObservable().pipe(
            map((cart: Map<number, CartEntry>) =>
                Object.keys(cart).reduce((sum: number, key: string) =>
                    sum + (cart[key].amount), 0
                )
            ),
            tap((a) => console.log(a))
        );
    }

    // can be called from outside and emits .next fo all Subscribers (who took the cart with cart())
    addProduct(product: Product): void {
        if (this.cart[product.id]) {
            // console.log('cart already contains that item. increasing amount');
            this.cart[product.id].amount++;
        } else {
            this.cart[product.id] = {product: product, amount: 1};
        }
        this.cartSubject.next(this.cart);
    }

    // can be called from outside and emits .next fo all Subscribers (who took the cart with cart())
    // removes product completely
    removeProduct(product: Product): void {
        if (this.cart[product.id]) {
            delete this.cart[product.id];
        }
        this.cartSubject.next(this.cart);
    }

    // can be called from outside and emits .next fo all Subscribers (who took the cart with cart())
    setAmountFor(product: Product, newAmount: number): void {
        // console.log("setting amount");
        if (this.cart[product.id]) {
            this.cart[product.id].amount = newAmount;
            // console.log("set amount");
        }
        this.cartSubject.next(this.cart);
    }

    getAsOrderItems(): OrderItem[] {
        let orderItems: OrderItem[] = [];
        for(let key of Object.keys(this.cart)) {
            orderItems.push({
                id: this.cart[key].product.id,
                count: this.cart[key].amount
            })
        }
        return orderItems;
    }

    getCart() {
        return this.cart;
    }

    resetCart(): void {
        this.cart = new Map();
        this.cartSubject.next(this.cart);
    }
}
