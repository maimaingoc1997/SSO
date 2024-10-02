import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../shared/models/cart/cart.model';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  selectedProduct: Product | null = null;
  productId: string | null = null;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');

      if (this.productId) {
        this.loadProduct(this.productId);
      }
    }
    )
  }
  loadProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe((product) => {
      this.selectedProduct = product;
    });
  }

  addToCart(item: any) {
    const userId = this.authService.getUserId();
    if(this.selectedProduct){
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
      next: (response) => {
        this.cartService.updateCartItemCount(item.length);
        console.log('Item added to cart', response);
      },
      error: (err) => {
        console.error("Failed to add item to cart", err)
      }
    });
    }
  }
}
