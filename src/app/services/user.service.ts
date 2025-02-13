import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUserInfo() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('User ID:', decodedToken.Id);
      console.log('Email:', decodedToken.Email);
      return decodedToken;
    }
    return null;  
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
  
  getUserId(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.Id : null;
  }
}
