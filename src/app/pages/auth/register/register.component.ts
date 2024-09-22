import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Console, log } from 'console';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
@Injectable()
export class RegisterComponent {
  private baseApi = 'http://localhost:5243/api/';
  constructor(private http: HttpClient, private router: Router) {}
  formRegister = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
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
      if (formValue.username != null && formValue.email != null) {
        let response = this.http.post(
          this.baseApi + 'Users/register',
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
        console.warn('Username is null or email is null');
      }
    } else {
      console.warn('Password is null or confirm password not match');
    }
  }
}
