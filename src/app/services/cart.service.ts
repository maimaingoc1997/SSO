import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart/cart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseApiUrl: string = "https://localhost:7135";
  constructor(private http:HttpClient) { }

  getAllCartItemsByUserId(): Observable<Cart[]>{
    return this.http.get<Cart[]>(`${this.baseApiUrl}/api/Cart`);
  }
}
