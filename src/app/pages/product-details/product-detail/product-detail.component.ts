import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  selectedProduct: Product | null = null;
  productId: string | null = null;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService
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
    this.cartService.addToCart(item,userId).subscribe({
      next: (response) => {
        console.log('Item added to cart', response);
      },
      error: (err) => {
        console.error("Failed to add item to cart", err)
      }
    });
  }
}
