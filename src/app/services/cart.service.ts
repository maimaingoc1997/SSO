import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../shared/models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseApiUrl: string = "https://localhost:7135/api/Cart";
  constructor(private http: HttpClient) { }

  getCartItems(userId: number): Observable<Cart[]> {
    const headers = new HttpHeaders({
      //'userId': userId.toString(),
      'userId': '1'
    });
    return this.http.get<Cart[]>(this.baseApiUrl, { headers });
  }
}
