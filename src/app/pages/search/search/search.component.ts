import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../shared/models/product/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/cart/cart.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule,
    MatIconButton,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResult: Product[] = [];
  userId: number = 1;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || ''; // Access query parameter
      this.LoadSearchedProduct(this.searchQuery); // Call the search method
    });
  }
  LoadSearchedProduct(searchQuery: string): void {
    this.productService.searchProductByName(searchQuery).subscribe({
      next: (products: Product[]) => {
        if (products && products.length > 0) {
          this.searchResult = products;
        } else {
          this.searchResult = [];
          console.log(`No products found for name: ${searchQuery}`);
        }
      },
      error: (error: any) => {
        console.log(error);
        this.searchResult = [];
      }
    })
  }
  addToCart(product: Product) {
    const cartItem: Cart = {
      cartId: 0, 
      productId: product.id, 
      productName: product.name || '', 
      productPrice: product.price, 
      image: product.image || '', 
      size: 0, // Set a default or handle user input
      quantity: 1, 
      isWishlist: 0 
    };
  
    console.log(cartItem); // Log cart item before sending to check data
  
    this.cartService.addToCart(cartItem, this.userId).subscribe({
      next: (response) => {
        console.log('Item added to cart', response);
      },
      error: (err) => {
        console.error('Failed to add item to cart', err);
      }
    });
  }
}
