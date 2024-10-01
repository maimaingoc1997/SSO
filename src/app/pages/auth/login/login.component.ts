import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterComponent } from '../register/register.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth, signInWithPopup,GoogleAuthProvider } from '@angular/fire/auth'; 
import { FormBuilder, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, ReactiveFormsModule, MatIconModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
@Injectable()
export class LoginComponent {
  formLogin = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  passwordVisible: boolean = false; 
  
  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    const formValue = this.formLogin.value;
    this.authService.loginUser(formValue).subscribe(
      (response) => {
        console.log('Response:', response);
        this.router.navigate(['']);
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
