import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/authService/auth.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../shared/models/cart/cart.model';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,
            MatDialogModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  selectedProduct: Product | null = null;
  productId: string | null = null;
  showNotification: boolean = false;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      console.log("Selected product id:",this.productId);
      if (this.productId) {
        this.loadProduct(this.productId);
      }
    }
    )
  }
  loadProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe((product) => {
      this.selectedProduct = product;
      console.log("selected product name", this.selectedProduct.name)
    });
  }

  addToCart(item: any) {
    const userId = this.authService.getUserId();
    if (this.selectedProduct) {
      const cartItem: Cart = {
        cartId: 0,
        productId: this.selectedProduct.id,
        productName: this.selectedProduct.name,
        productPrice: this.selectedProduct.price,
        image: this.selectedProduct.image || '',
        size: this.selectedProduct.sizeId,
        quantity: 1,
        isWishlist: 0
      };

      this.cartService.addToCart(cartItem, userId).subscribe({
        next: () => {
          this.showNotification = true; // Show the notification
          // Automatically hide notification after 3 seconds
          setTimeout(() => {
            this.showNotification = false;
          }, 1000);
        },
        error: (err) => {
          console.error("Failed to add item to cart", err);
        }
      });
    }
  }
}
