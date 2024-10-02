import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { privateDecrypt } from 'crypto';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApi = 'https://localhost:7135/api/';

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getLocalStorageItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null; // Return null or handle accordingly for SSR
  }

  loginUser(formValue: any): Observable<any> {
    return this.http.post(this.baseApi + 'User/login', formValue, {
      responseType: 'json',
    });
  }
  registerUser(formValue: any): Observable<any> {
    return this.http.post(this.baseApi + 'User/register', formValue, {
      responseType: 'text',
    });
  }
  getUserInfo() {
    const token = this.getLocalStorageItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }
  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      console.log('Login successful:', result.user);
      this.router.navigate(['/']); // Redirect to home after successful login
    } catch (error) {
      console.error('Login error: ', error);
    }
  }
  async signUpWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      throw error;
    }
  }
  isLoggedIn(): boolean {
    const token = this.getLocalStorageItem('authToken');
    return !!token;
  }

  getUserId(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.Id : null;
  }

  getToken(): string | null {
    return this.getLocalStorageItem('authToken');
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
    }
  }
}
