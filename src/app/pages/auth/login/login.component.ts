import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterComponent } from '../register/register.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
@Injectable()
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) {}
  private baseApi = 'http://localhost:5243/api/';
  formLogin = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  loginUser() {
    let formValue = this.formLogin.value;
    console.log(formValue)
    let response = this.http.post(this.baseApi + 'Users/login', formValue, {
      responseType: 'json',
    });
    response.subscribe(
      (response: any) => {
        console.log('Response:', response); // Log the actual response
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error:', error); // Handle and log any error
      }
    );
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
