import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}



  canActivate(route: ActivatedRouteSnapshot): boolean {
  // --- ด่านที่ 1: ตรวจสอบการล็อกอิน ---
  if (!this.authService.isAuthenticated()) {
    console.error('AuthGuard: Not logged in. Redirecting to login.');
    this.router.navigate(['/loginpage']);
    return false;
  }

  // --- ด่านที่ 2: ตรวจสอบ Role ---
  const currentUser = this.authService.getCurrentUser();
  const requiredRole = route.data['role'];

  // ===================== DEBUGGING LOGS =====================
  // นี่คือส่วนที่เราเพิ่มเข้ามาเพื่อหาต้นตอของปัญหา
  console.log("-----------------------------------------");
  console.log("AuthGuard is checking roles...");
  console.log(`Value of currentUser.role: `, currentUser?.role);
  console.log(`Type of currentUser.role:  `, typeof currentUser?.role);
  console.log(`Value of requiredRole:     `, requiredRole);
  console.log(`Type of requiredRole:      `, typeof requiredRole);
  console.log(`Are they equal? (===):     `, currentUser?.role === requiredRole);
  console.log("-----------------------------------------");
  // ========================================================

  if (currentUser && currentUser.role === requiredRole) {
    return true; // ถ้าผ่าน ให้เข้าหน้าได้เลย
  }
  
  // ถ้าไม่ผ่าน...
  console.error('AuthGuard: Access Denied. User does not have the required role.');
  alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');

  // ส่งกลับไปหน้าที่เหมาะสม
  if (currentUser && currentUser.role === 1) {
    this.router.navigate(['/user/home']);
  } else if (currentUser && currentUser.role === 0) {
    this.router.navigate(['/admin/home']);
  } else {
    this.router.navigate(['/loginpage']);
  }

  return false;
}
}