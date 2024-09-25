import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../shared/models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseApiUrl: string = "https://localhost:7135/api/Cart"
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

  addToCart(item: any, userId: number) {
    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });
  
    return this.http.post(`${this.baseApiUrl}/add`, item, { headers });
  }

  Remove(item: any, userId: number){
    const headers = new HttpHeaders({
      'userId': userId.toString(),
    });

    return this.http.post(`${this.baseApiUrl}/remove`, item, { headers });
  }
  
}
