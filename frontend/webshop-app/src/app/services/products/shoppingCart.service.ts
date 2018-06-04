import {CartEntry, Product} from '../../types/api/product';

export class ShoppingCartService {

    // workaround for a map id => amount
    private cart: { [id: number]: CartEntry } = {};
    private totalItems = 0;

    addProduct(product: Product): void {
        if (this.cart[product.id]) {
            console.log('cart already contains that item. increasing amount');
            this.cart[product.id].amount++;
        } else {
            this.cart[product.id] = {product: product, amount: 1}
        }
        this.totalItems++;
    }

    // removes product completely
    removeProduct(product: Product): void {
        if(this.cart[product.id]) {
            delete this.cart[product.id];
        }
    }

    setAmountFor(product: Product, newAmount: number): void {
        console.log("setting amount");
        if(this.cart[product.id]) {
            this.cart[product.id].amount = newAmount;
            console.log("set amount");
        }
    }

    getTotalPrice(): number {
        let sum = 0;
        for(let key in this.cart) {
            sum += this.cart[key].amount * this.cart[key].product.price;
        }
        return sum;
    }

    getSumFor(product: Product): number {
        const amount = this.getAmountFor(product.id);
        return amount * product.price;
    }

    getCart(): { [id: number]: CartEntry } {
        return this.cart;
    }

    getAmountFor(id: number) {
        return this.cart[id] ? this.cart[id] : 0;
    }

    getAllCartItems(): CartEntry[] {
        let entries: CartEntry[] = [];
        for(let key in this.cart) {
            entries.push(this.cart[key]);
        }
        return entries;
    }

}
