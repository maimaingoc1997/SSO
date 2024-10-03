import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Console, log } from 'console';
import { response } from 'express';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { AuthService } from '../../../services/authService/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
@Injectable()
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  formRegister = new FormGroup({
    email: new FormControl(),
    confirm_email: new FormControl(),
    password: new FormControl(),
    confirm_password: new FormControl(),
  });

  goToLogin() {
    this.router.navigate(['/login']);
  }
  registerUser() {
    let formValue = this.formRegister.value;
    console.log(formValue);
    if (
      formValue.password != null &&
      formValue.password === formValue.confirm_password
    ) {
      if (
        formValue.email != null &&
        formValue.email === formValue.confirm_email
      ) {
        this.authService.registerUser(formValue).subscribe(
          (response) => {
            console.log('Response:', response);
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      } else {
        console.warn('Email is null or confirm email not match');
      }
    } else {
      console.warn('Password is null or confirm password not match');
    }
  }

  //  async signUpWithGoogle() {
  //     try {
  //       const user = await this.authService.signUpWithGoogle();
  //       console.log('Đăng ký thành công:', user);
  //       // Thực hiện các hành động sau khi đăng ký thành công
  //     } catch (error) {
  //       console.error('Lỗi đăng ký:', error);
  //     }
  //   }
  async signUpWithGoogle() {
    try {
      const { user, token } = await this.authService.signUpWithGoogle();
      console.log('Sign-up successful:', user);
      console.log('Access Token:', token);

      // Perform additional actions after successful sign-up
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  }
}
