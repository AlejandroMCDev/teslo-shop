export interface Product {
    id: string
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //type: ValidType;
    gender: Category
}

export interface CartProduct {
    id: string
    slug: string
    title: string
    price: number
    quantity: number
    size: Size
    image: string
}

export interface ProductsReponse {
    id: string
    description: string
    inStock: number
    price: number
    sizes: Size[]
    slug: string
    title: string
    tags: string[]
    gender: Category
    categoryId: string
    ProductImage: Record<string,string>[]
}

export type Category = 'men'|'women'|'kid'|'unisex'
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidType = 'shirts'|'pants'|'hoodies'|'hats';