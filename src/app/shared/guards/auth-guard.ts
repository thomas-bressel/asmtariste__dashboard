import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@services/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  
  
  // Check if a token exist
  const token = authService.getAccessToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  
  // Check if the tocken is valid and the session exist
  try {
    const response = await authService.verifySession();

    if (response.ok) {
      return true; // Token is valide -> acces authorized
    } else if (response.status === 401) {
      const newToken = await authService.refreshAccessToken(); // Token expired -> try to refresh
      
      if (newToken) {
        return true; // Refresh done -> acces authorized
      } else {
        authService.clearTokens(); // Refresh failed -> redirected to /login route
        router.navigate(['/login']);
        return false;
      }
    } else {
      authService.clearTokens();  // Error -> redirected to /login route
      router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    authService.clearTokens(); // Network Error -> redirected to /login route
    router.navigate(['/login']);
    return false;
  }
};