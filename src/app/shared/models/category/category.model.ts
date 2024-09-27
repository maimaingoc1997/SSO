import { Product } from "../product/product.model";

export interface Category {
    id: number;
    name: string;
    description?: string;
    parentId: number;
    products: Product[];
    children?: Category[];
}

