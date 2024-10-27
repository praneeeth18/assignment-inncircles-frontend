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
      console.log('Checking user roles:', userRole);
      console.log('Required roles for this route:', requiredRoles);
      
      const hasRequiredRole = userRole.some(role => requiredRoles.includes(role));
      console.log('Has required role:', hasRequiredRole);
      
      if (!hasRequiredRole) {
        return false;
      }
    }

    return true;
};
