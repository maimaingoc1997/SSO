import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product/product.model';
import { Cart } from '../../../shared/models/cart/cart.model';
import { Category } from '../../../shared/models/category/category.model';
import { Size } from '../../../shared/models/size/size.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];

  constructor(private productService: ProductService){}
  
    ngOnInit(): void {
    this.productService.getAllProduct()
    .subscribe({
      next: (products: Product[]) => {
        this.products = products;
        console.log(products); 
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }

}
