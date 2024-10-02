import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth, signInWithPopup,GoogleAuthProvider } from '@angular/fire/auth'; 
import { FormBuilder, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/authService/auth.service';
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

  passwordVisible: boolean = false; 
  
  loginUser() {
    const formValue = this.formLogin.value;
    console.log(formValue);
    this.authService.loginUser(formValue)
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
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Toggle the boolean
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
