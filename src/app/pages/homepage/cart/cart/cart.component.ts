import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../services/cart.service';
import { Cart } from '../../../../shared/models/cart/cart.model';
import { Observable } from 'rxjs';
import { response } from 'express';
import { error } from 'console';

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
  userId: number = 1; // This can be retrieved from user authentication data or session

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems();
    window.scrollTo(0, 0);
  }

  loadCartItems() {
    this.cartService.getCartItems(this.userId).subscribe(
      (items) => {
        this.cartItems = items;
        console.log('Cart Items:', this.cartItems);
      },
      (error) => {
        console.error('Error loading cart items', error);
      }
    );
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  }

  
}