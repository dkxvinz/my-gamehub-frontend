import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

export interface UserModel{
  userId: number;
  name: string;
  email:string;
  profile_image:string;
  role:number;
}
export interface AuthResponse{
  token:string;
  userData:UserModel;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService  {

  private API_URL = 'https://node-gamehub.onrender.com';
  public isLoggedIn: boolean = false;
  public currentUser: UserModel | null = null;
  snapshot: any;
   
   constructor(private http: HttpClient, private router:Router){
    this.updateAuthState();
   }
   private updateAuthState():void {
     this.currentUser = this.getCurrentUser();
     this.isLoggedIn = this.isAuthenticated();
  }
   
  
    public setCurrentUser(user: any): void {
    console.log('AuthService: Saving user to localStorage...', user); 
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.updateAuthState();
    }
  }

  // ฟังก์ชันนี้ต้องใช้ JSON.parse
  public getCurrentUser(): any {
    const userString = localStorage.getItem('currentUser');
    console.log('AuthService: Reading from localStorage...', userString); // เพิ่ม log เพื่อดูว่าอ่านค่าอะไรได้

    if (userString) {
      const userObject = JSON.parse(userString);
      console.log('AuthService: After parsing, returning object...', userObject); // เพิ่ม log เพื่อดูผลลัพธ์หลัง parse
      return userObject;
    }
    return null;
  }


  getCurrentUserId(): number | null { 
  const user = this.getCurrentUser();

  if (user && user.userId) {
    return user.userId;
  }
  return null;
}


  
  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

 
  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

   
  get isAdmin(): boolean {
    return this.isLoggedIn && this.currentUser?.role === 0;
  }

  // Getter สำหรับเช็คว่าเป็น User ทั่วไปหรือไม่
  get isUser(): boolean {
    return this.isLoggedIn && this.currentUser?.role === 1;
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.updateAuthState();
  }


}