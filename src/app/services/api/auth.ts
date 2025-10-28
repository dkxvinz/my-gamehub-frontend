import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface UserModel {
  userId: number;
  name: string;
  email: string;
  profile_image: string;
  role: number;
  wallet_balance: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private sessionTimeout = 60 * 60 * 1000; // 1 ชั่วโมง
  private idleTimer: any;

  private currentUserSubject = new BehaviorSubject<UserModel | null>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();
  public currentUser: UserModel | null = this.getCurrentUser();

  private router = inject(Router);

  login(userData: UserModel, token: string) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('token', token);
    localStorage.setItem('sessionExpiry', (Date.now() + this.sessionTimeout).toString());
    this.setCurrentUser(userData);
    this.startIdleTimer();
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('sessionExpiry');
    this.currentUser = null;
    this.currentUserSubject.next(null);
    if (this.idleTimer) clearTimeout(this.idleTimer);
    this.router.navigate(['/loginpage']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): UserModel | null {
    const str = localStorage.getItem('currentUser');
    return str ? JSON.parse(str) : null;
  }

  setCurrentUser(user: UserModel) {
    this.currentUser = user;
    this.currentUserSubject.next(user);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 0;
  }

  get isUser(): boolean {
    return this.currentUser?.role === 1;
  }
  saveToken(token: string) {
  localStorage.setItem('token', token);
  const expiry = Date.now() + this.sessionTimeout;
  localStorage.setItem('sessionExpiry', expiry.toString());
}

  /** ตรวจสอบ session หมดอายุ */
  private checkSessionExpiry() {
    const expiry = localStorage.getItem('sessionExpiry');
    if (expiry && Date.now() > parseInt(expiry)) {
      this.logout();
      alert('เซสชันหมดอายุ กรุณา login ใหม่');
    }
  }
  getCurrentUserId(): number | null {
  return this.currentUser?.userId ?? null;
}

  /** Idle timer สำหรับ inactivity */
  startIdleTimer() {
    if (this.idleTimer) clearTimeout(this.idleTimer);

    const resetTimer = () => {
      this.checkSessionExpiry();
      if (this.idleTimer) clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        this.logout();
        alert('คุณไม่ได้ใช้งานนานเกิน 1 ชั่วโมง ระบบจะ logout อัตโนมัติ');
      }, this.sessionTimeout);
    };

    ['mousemove', 'keydown', 'scroll', 'click'].forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // เริ่ม timer ครั้งแรก
  }
}
