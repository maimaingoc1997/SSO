import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product/product.model';
import { Cart } from '../../../shared/models/cart/cart.model';
import { Category } from '../../../shared/models/category/category.model';
import { Size } from '../../../shared/models/size/size.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  category: string = "women"

  constructor(private productService: ProductService, private route: ActivatedRoute){}
  
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

  // ngOnInit(): void {
  //   // Get category from the URL
  //   this.route.paramMap.subscribe((params: ParamMap) => {
  //     this.category = params.get('category') || 'women'; 
  //     this.loadProductsByCategory(this.category);
  //   });
  // }

  // loadProductsByCategory(category: string): void {
  //   this.productService.getProductsByCategory(category)
  //     .subscribe({
  //       next: (products: Product[]) => {
  //         this.products = products;
  //         console.log(products);
  //       },
  //       error: (error: any) => {
  //         console.log(error);
  //       }
  //     });
  // }

}
