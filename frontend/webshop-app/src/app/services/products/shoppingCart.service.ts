import {Product} from '../../types/product';

export class ShoppingCartService {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    removeProduct(product: Product): void {
        const index: number = this.products.indexOf(product, 0);
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }

    getTotalPrice() {
        return this.products.reduce((a, b) => a.price + b.price [0]);
    }

}
