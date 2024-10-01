import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inject the AuthService
  const router = inject(Router);            // Inject the Router

  if (authService.isLoggedIn()) {
    return true;  // Allow access if the user is logged in
  } else {
    // Redirect to the login page if not logged in
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;  // Block access if not logged in
  }
};
