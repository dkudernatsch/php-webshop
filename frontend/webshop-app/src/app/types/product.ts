export interface Product {
    id: number;
    name: string;
    price: number;
    imagePath: string;
    rating: number;
    categories: number[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export class ProductTypeGuard implements TypeGuard<Product> {
    is(val: any): val is Product {
        return val.id !== undefined
            && val.name !== undefined
            && val.price !== undefined
            && val.imagePath !== undefined
            && val.rating !== undefined
            && val.categories !== undefined;
    }
}

export class CategoryTypeGuard implements TypeGuard<Category> {
    is(val: any): val is Category {
        return val.id !== undefined
            && val.name !== undefined
            && val.slug !== undefined;
    }
}
