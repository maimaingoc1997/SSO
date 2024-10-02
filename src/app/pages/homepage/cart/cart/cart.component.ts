import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../services/cart.service';
import { UserService } from '../../../../services/user.service';
import { Cart } from '../../../../shared/models/cart/cart.model';
import { AuthService } from '../../../../services/authService/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: Cart[] = [];

  constructor(private cartService: CartService, private auth: Auth, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadCartItems();
    window.scrollTo(0, 0);
  } 

  loadCartItems() {
    const userId = this.authService.getUserId(); // Retrieve user ID from UserService
    console.log('User ID:', userId);

    if (userId) {
      this.cartService.getCartItems(userId).subscribe(
        (items) => {
          this.cartItems = items;
          console.log('Cart Items:', this.cartItems);
        },
        (error) => {
          console.error('Error loading cart items', error);
        }
      );
    } else {
      console.error('User not logged in or UID is missing');
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  }

  remove(item: any){
    const currentUserId = this.authService.getUserId();
    this.cartService.remove(item, currentUserId).subscribe({
      next: (response) => {
        console.log('Item removed', response); 
        this.loadCartItems();
      },
      error: (err) => {
        console.error("Failed to remove", err)
      }
    });
  }
  onQuantityChange(item: Cart) {
    if (item.quantity < 1) {
      const confirmation = confirm("Are you sure you want to remove this item from your cart?");
      if (confirmation) {
        this.remove(item);
      } else {
        item.quantity = 1;
      }
    }
  };

  incrementQuantity(item: Cart) {
    item.quantity++;
  }

  decrementQuantity(item: Cart) {
    if (item.quantity === 1) {
      const confirmation = confirm("Are you sure you want to remove this item from your cart?");
      if (confirmation) {
        this.remove(item);
      }
    } else {
      item.quantity--;
    }
  }

}