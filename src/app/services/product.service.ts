import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseApiUrl: string = "https://localhost:7135"; 
  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/Product`);
  }

  getProductsByCategory(categoryId: any): Observable<Product[]> { 
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/Product/categories/${categoryId}`);
  }
}
