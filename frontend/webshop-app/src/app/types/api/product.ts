export interface Product {
    id: number;
    name: string;
    price: number;
    imagePath: string;
    rating: number;
    categories: number[];
}

export interface NewProduct {
    name: string;
    price: number;
    imageData: string;
    rating: number;
    categories: number[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface NewCategory {
    name: string;
    slug: string;
}
