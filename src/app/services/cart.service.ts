import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cart } from '../shared/models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseApiUrl: string = "https://localhost:7135/api/Cart";
  private baseApiUrlCart: string = "https://localhost:7135/api/Cart/user-cart";
  private baseApiUrlWishList: string = "https://localhost:7135/api/Cart/user-wishlist";

  private cartItemCountSource = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSource.asObservable();
  
  constructor(private http: HttpClient) { }

  updateCartItemCount(count: number) {
    this.cartItemCountSource.next(count);
  }

  getCartItems(userId: any): Observable<Cart[]> {
    if (!userId) {
      console.error('User ID is null or undefined');
      return of([]); // Return an empty array or handle the error case appropriately
    }

    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });

    return this.http.get<Cart[]>(this.baseApiUrlCart, { headers }).pipe(
      catchError(err => {
        console.error('Error fetching cart items:', err);
        return of([]); // Return an empty array on error
      })
    );
  }

  getWishListItems(userId: number): Observable<Cart[]> {
    if (!userId) {
      console.error('User ID is null or undefined');
      return of([]); // Return an empty array or handle the error case appropriately
    }

    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });

    return this.http.get<Cart[]>(this.baseApiUrlWishList, { headers }).pipe(
      catchError(err => {
        console.error('Error fetching wishlist items:', err);
        return of([]); // Return an empty array on error
      })
    );
  }

  addToCart(item: any, userId: any) {
    if (!userId) {
      console.error('User ID is null or undefined');
      return of(null); // Handle the case where userId is null or undefined
    }

    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });

    return this.http.post(`${this.baseApiUrl}/add`, item, { headers }).pipe(
      tap(() => {
        this.getCartItems(userId).subscribe((items) => {
          this.updateCartItemCount(items.length); // Emit the updated count
        });
      }),
      catchError(err => {
        console.error('Error adding item to cart:', err);
        return of(null); // Return null or handle error
      })
    );
  }

  remove(item: any, userId: any) {
    if (!userId) {
      console.error('User ID is null or undefined');
      return of(null); // Handle the case where userId is null or undefined
    }

    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });

    return this.http.post(`${this.baseApiUrl}/remove`, item, { headers }).pipe(
      catchError(err => {
        console.error('Error removing item from cart:', err);
        return of(null); // Handle error case
      })
    );
  }
}
