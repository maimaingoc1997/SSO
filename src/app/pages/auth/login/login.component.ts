import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, ReactiveFormsModule, MatIconModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
@Injectable()
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient, private auth: Auth,private cartService: CartService, private authService: AuthService) { }
  private baseApi = 'https://localhost:7135/api/';
  formLogin = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  loginUser() {
    const formValue = this.formLogin.value;
    console.log(formValue);
  
    // Call the login API
    this.http.post(this.baseApi + 'User/login', formValue, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          console.log('Response:', response);
  
          // Store the token in localStorage
          localStorage.setItem('authToken', response.token);  // Ensure 'authToken' matches the key you're checking
  
          // Retrieve user information from the token using UserService
          const userInfo = this.authService.getUserInfo();
          console.log('Logged in User Info:', userInfo);

          if (userInfo) {
            this.cartService.getCartItems(userInfo.Id).subscribe((items) => {
              this.cartService.updateCartItemCount(items.length); // Update the count immediately
            });
          }
          // Redirect to home or another route
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  
  goToRegister() {
    this.router.navigate(['/register']);
  }
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      // Nếu đăng nhập thành công, chuyển hướng về trang chủ hoặc trang bạn muốn
      console.log('Login successful:', result.user);
      this.router.navigate(['/']); // Điều hướng tới trang sau khi đăng nhập thành công
    } catch (error) {
      console.error('Login error: ', error);
    }
  }
}
