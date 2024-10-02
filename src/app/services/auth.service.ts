import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private getLocalStorageItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null; // Return null or handle accordingly for SSR
  }

  getUserInfo() {
    const token = this.getLocalStorageItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken;
    }
    return null;  
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
