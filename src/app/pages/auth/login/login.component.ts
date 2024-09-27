import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterComponent } from '../register/register.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth, signInWithPopup,GoogleAuthProvider } from '@angular/fire/auth'; 

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, ReactiveFormsModule, MatIconModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
@Injectable()
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient, private auth: Auth) { }
  private baseApi = 'https://localhost:7135/api/';
  formLogin = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  loginUser() {
    let formValue = this.formLogin.value;
    console.log(formValue)
    let response = this.http.post(this.baseApi + 'User/login', formValue, {
      responseType: 'json',
    });
    response.subscribe(
      (response: any) => {
        console.log('Response:', response); // Log the actual response
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error:', error); // Handle and log any error
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
