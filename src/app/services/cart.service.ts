import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseApiUrlCart: string = "https://localhost:7135/api/Cart/user-cart";
  private baseApiUrlWishList: string ="https://localhost:7135/api/Cart/user-wishlist";
  constructor(private http: HttpClient) { }

  getCartItems(userId: number): Observable<Cart[]> {
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

}
