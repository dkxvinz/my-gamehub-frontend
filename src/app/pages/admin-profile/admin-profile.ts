import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { Router, RouterLink,ActivatedRoute } from '@angular/router';
import { UsersGetRes } from '../../model/user_get_res';
import { UsersService } from '../../services/api/users';
import { NgIf } from "@angular/common";
import { AuthService } from '../../services/api/auth';

@Component({
  selector: 'app-admin-profile',
  imports: [Header, RouterLink, NgIf],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.scss'
})
export class AdminProfile implements OnInit{



isLoading: boolean = true;
errorMessage = '';

userGetRes: UsersGetRes | null = null;


constructor(private activeRoute:ActivatedRoute,private userService:UsersService ,private router:Router,private authService:AuthService) {}

ngOnInit(): void {
  this.loadUserProfile();
  }
  async loadUserProfile(): Promise<void> {
    try {
      const idFromUrl = this.activeRoute.snapshot.paramMap.get('id');
      if(idFromUrl){
            
          const userId = Number(idFromUrl);
          console.error('user profile: ',userId);
          this.userGetRes = await this.userService.getProfile(userId);
      }else{
        console.error('user id not found in url.');
      }
    } catch (error) {
      console.error('failed to load user profile: ',error);
      this.errorMessage = 'ไม่สามารถโหลดข้อมูลโปรไฟล์ได้';
    } 
    finally {
      this.isLoading = false;
    }
    
  }

 


  
onLogout() {
  
    this.authService.logout();
    this.router.navigate(['/loginpage']);
}
}
