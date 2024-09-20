import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../shared/models/category/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This ensures the service is available app-wide
})
export class CategoryService {
  private baseApiUrl: string = "https://localhost:7135"; // Use a private modifier for encapsulation

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseApiUrl}/api/Categories`); // Use template literals for clarity
  }
}
