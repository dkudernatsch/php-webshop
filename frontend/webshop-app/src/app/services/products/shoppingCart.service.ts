import {Product} from '../../types/product';

export class ShoppingCartService {

    // workaround for a map id => amount
    private amounts: { [id: number]: number; } = {};
    private products: Product[] = [];
    private totalItems = 0;

    addProduct(product: Product): void {
        const id = product.id;
        const index: number = this.products.indexOf(product, 0);
        if (index > -1) {
            this.amounts[id]++;
            console.log('cart already contains that item. increasing amount');
            console.log(this.getAmountFor(id));
        } else {
            this.products.push(product);
            this.amounts[id] = 1;
        }
        this.totalItems++;
        console.log('total amount of items is: ' + this.totalItems);
        console.log('total price is now: ' + this.getTotalPrice());
    }

    // removes product completely
    removeProduct(product: Product): void {
        const index: number = this.products.indexOf(product, 0);
        if (index > -1) {
            this.products.splice(index, 1);
            this.amounts[product.id] = 0;
        }
    }

    setAmountFor(product: Product, newAmount: number): void {
        this.amounts[product.id] = newAmount;
        console.log('amount now is: ' + this.amounts[product.id]);
    }

    getTotalPrice(): number {
        return this.products.reduce((a, b) => {
            return a + this.getSumFor(b);
        }, 0);
    }

    getSumFor(product: Product): number {
        const amount = this.getAmountFor(product.id);
        return amount * product.price;
    }

    getAllItems(): Product[] {
        return this.products;
    }

    getAmounts(): { [id: number]: number; } {
        return this.amounts;
    }

    getAmountFor(id: number) {
        return typeof(this.amounts[id]) === 'undefined' ? 0 : this.amounts[id];
    }

}
