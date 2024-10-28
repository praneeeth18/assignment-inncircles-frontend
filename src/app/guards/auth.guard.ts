import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const authService = inject(AuthService); 
    const router = inject(Router); 

    const token = authService.getAccessToken();
    if (!token) {
      alert('Unknown error! Login Again!');
      router.navigate(['/login']);
      return false;
    }

    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = authService.getUserRoles(); 
      
      const hasRequiredRole = userRole.some(role => requiredRoles.includes(role));
      
      if (!hasRequiredRole) {
        router.navigate(['/issues']);
        return false;
      }
    }

    return true;
};
