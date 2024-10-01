import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApi = 'https://localhost:7135/api/';

  constructor(private http: HttpClient, private auth: Auth, private router: Router) {}

  loginUser(formValue: any): Observable<any> {
    return this.http.post(this.baseApi + 'User/login', formValue, { responseType: 'json' });
  }
  registerUser(formValue: any): Observable<any> {
    return this.http.post(this.baseApi + 'User/register', formValue, { responseType: 'text' });
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
}
