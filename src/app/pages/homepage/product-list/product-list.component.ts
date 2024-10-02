import { Component, OnInit, } from '@angular/core';
import { Product } from '../../../shared/models/product/product.model';
import { Category } from '../../../shared/models/category/category.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Router } from 'express';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,
    MatPaginatorModule,
    RouterLink   
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  category: string = "women"
  categories: Category[] = [];
  selectedCategory: Category | null = null;

  currentPage = 0; 
  handlePageEvent(pageEvent: PageEvent){
    console.log("handlePageEvent", pageEvent)
  }
  private categorySubscription!: Subscription;


  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService) { }



    ngOnInit(): void {
      this.categoryService.getAllCategories().subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
          
          // If there are categories, load the selected or default category
          if (this.categories.length > 0) {
            // Check if a category was previously selected
            const selectedCategoryId = this.categoryService.getSelectedCategoryId();
            
            // Load products for the selected category or default to the first one
            if (selectedCategoryId) {
              this.loadProductsByCategory(selectedCategoryId);
            } else {
              const firstCategoryId = this.categories[0].id;
              this.loadProductsByCategory(firstCategoryId);
              this.categoryService.selectCategory(firstCategoryId); // Select the first category
            }
          }
        },
        error: (error: any) => {
          console.log('Error fetching categories', error);
        }
      });
    
      // Listen for changes in the selected category
      this.categorySubscription = this.categoryService.selectedCategory$.subscribe((categoryId) => {
        console.log('Selected categoryId in ProductListComponent: ', categoryId);
        if (categoryId) {
          this.loadProductsByCategory(categoryId);
        }
      });
    }
    
    
    
    loadProductsByCategory(categoryId: number): void {
      console.log(`Loading products for category ID: ${categoryId}`); // Debugging
      this.productService.getProductsByCategory(categoryId)
        .subscribe({
          next: (products: Product[]) => {
            console.log(`Products loaded for category ID: ${categoryId}`, products); // Debugging
            if (products && products.length > 0) {
              this.products = products;  
            } else {
              this.products = [];  
              console.log(`No products found for category: ${categoryId}`);
            }
          },
          error: (error: any) => {
            console.log(error);
            this.products = []; 
          }
        });
    }
    
  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

}
