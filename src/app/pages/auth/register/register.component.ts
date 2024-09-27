import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Console, log } from 'console';
import { response } from 'express';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
@Injectable()
export class RegisterComponent {
  private baseApi = 'https://localhost:7135/api/';
  constructor(private http: HttpClient, private router: Router,private auth: Auth) {}
  formRegister = new FormGroup({
    
    email: new FormControl(),
    confirm_email : new FormControl(),
    password: new FormControl(),
    confirm_password: new FormControl(),
  });
  registerUser() {
    let formValue = this.formRegister.value;
    console.log(formValue);
    if (
      formValue.password != null &&
      formValue.password == formValue.confirm_password
    ) {
      if ( formValue.email != null&& formValue.email==formValue.confirm_email) {
        let response = this.http.post(
          this.baseApi + 'User/register',
          formValue,
          { responseType: 'text' }
        );
        response.subscribe(
          (response: any) => {
            console.log('Response:', response); // Log the actual response
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error:', error); // Handle and log any error
          }
        );
      } else {
        console.warn('Email is null or confirm email not match');
      }
    } else {
      console.warn('Password is null or confirm password not match');
    }
  }
  async signUpWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      console.log('Đăng ký thành công:', user);
      // Thực hiện các hành động sau khi đăng ký thành công
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
    }
  }
}
