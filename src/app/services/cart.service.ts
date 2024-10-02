import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from '../shared/models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseApiUrl: string = "https://localhost:7135/api/Cart"
  private baseApiUrlCart: string = "https://localhost:7135/api/Cart/user-cart";
  private baseApiUrlWishList: string = "https://localhost:7135/api/Cart/user-wishlist";

  private cartItemCountSource = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSource.asObservable();
  constructor(private http: HttpClient) { }

updateCartItemCount(count: number){
  this.cartItemCountSource.next(count)
}

  getCartItems(userId: any): Observable<Cart[]> {
    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });
    return this.http.get<Cart[]>(this.baseApiUrlCart, { headers });
  }
  getWishListItems(userId: number): Observable<Cart[]> {
    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });
    return this.http.get<Cart[]>(this.baseApiUrlWishList, { headers });
  }

  addToCart(item: any, userId: any) {
    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });

    return this.http.post(`${this.baseApiUrl}/add`, item, { headers }).pipe(
      tap(() => {
        // Refresh the cart count after a successful add
        this.getCartItems(userId).subscribe((items) => {
          this.updateCartItemCount(items.length); // Emit the updated count
        });
      })
    );;
  }

  Remove(item: any, userId: any) {
    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });

    return this.http.post(`${this.baseApiUrl}/remove`, item, { headers });
  }

}
