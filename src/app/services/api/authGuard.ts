import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../api/auth';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/loginpage']);
    return false;
  }

  const currentUser = authService.getCurrentUser();
  const requiredRole = route.data['role'];

  if (currentUser && requiredRole !== undefined && currentUser.role !== requiredRole) {
    alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');

    if (currentUser.role === 1) router.navigate(['/user/home']);
    else if (currentUser.role === 0) router.navigate(['/admin/home']);
    else router.navigate(['/loginpage']);

    return false;
  }

  return true;
};
