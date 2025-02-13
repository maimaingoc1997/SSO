import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../../shared/models/cart/cart.model';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  cartItems: Cart[] = [];
  userId: number = 1; // This can be retrieved from user authentication data or session

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadWishListItems();
    window.scrollTo(0, 0);
  }

  loadWishListItems() {
    this.cartService.getWishListItems(this.userId).subscribe(
      (items) => {
        this.cartItems = items;
        console.log('Cart Items:', this.cartItems);
      },
      (error) => {
        console.error('Error loading cart items', error);
      }
    );
  }

  addToCart(item: any){
    this.cartService.addToCart(item, this.userId).subscribe({
      next: (response) => {
        console.log('Item added to cart', response); 
        this.loadWishListItems();
      },
      error: (err) => {
        console.error("Failed to add item to cart", err)
      }
    });
}

// remove(item: any){
//   this.cartService.Remove(item, this.userId).subscribe({
//     next: (response) => {
//       console.log('Item removed', response); 
//       this.loadWishListItems();
//     },
//     error: (err) => {
//       console.error("Failed to remove", err)
//     }
//   });
// }
}
