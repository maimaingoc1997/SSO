import { Product } from "../product/product.model";

export interface Size { 
    id : number ; 
    name: string ; 
    quantity: number; 
    products: Product[];
}