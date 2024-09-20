import { Cart } from "../cart/cart.model";
import { Category } from "../category/category.model";
import { Size } from "../size/size.model";

export interface Product {
    id: number;
    name: string;
    status: number;
    description?: string;
    quantity: number;
    price: number;
    cateId: number;
    sizeId: number;
    image?: string;
    carts: Cart[];
    cate: Category;
    size: Size;
    

   
}
