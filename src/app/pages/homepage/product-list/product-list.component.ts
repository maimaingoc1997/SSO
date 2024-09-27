import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product/product.model';
import { Cart } from '../../../shared/models/cart/cart.model';
import { Category } from '../../../shared/models/category/category.model';
import { Size } from '../../../shared/models/size/size.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  category: string = "women"
  categories: Category[] = [];
  private categorySubscription!: Subscription;


  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService) { }
  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;

        // If categories exist, select the first one by default
        if (this.categories.length > 0) {
          const firstCategoryId = this.categories[0].id;
          this.loadProductsByCategory(firstCategoryId);

          // Optionally, set the first category as selected in the service
          this.categoryService.selectCategory(firstCategoryId);
        }
      },
      error: (error: any) => {
        console.log('Error fetching categories', error);
      }
    });
    
    this.categorySubscription = this.categoryService.selectedCategory$.subscribe((categoryId) => {
      console.log('Selected categoryId: ', categoryId); // Check if this prints the correct ID
      if (categoryId) {
        this.loadProductsByCategory(categoryId);
      }
    });
  }

  loadProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId)
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
  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

}
