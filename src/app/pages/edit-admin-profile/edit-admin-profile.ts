import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from '../../services/api/users';
import { UsersGetRes } from '../../model/user_get_res';
import { NgIf } from "@angular/common";


@Component({
  selector: 'app-editprofile',
  imports: [Header, MatFormFieldModule, MatIconModule, MatInputModule, MatDividerModule, MatButtonModule, NgIf],
 templateUrl: './edit-admin-profile.html',
  styleUrl: './edit-admin-profile.scss'
})
export class EditAdminProfile implements OnInit {
  selectedImage: string| null = null;
  userGet?: UsersGetRes | null;
  userId!:number;
  errorMessage:string = '';
  isLoading: boolean = true;
  constructor(private router: Router,private userService:UsersService,private activeRoute:ActivatedRoute){}
 
 ngOnInit(): void {
    this.loadUserProfile();
  }
  async loadUserProfile(): Promise<void> {
    try {
      const idFromUrl = this.activeRoute.snapshot.paramMap.get('id');
      if(idFromUrl){
        const userId = Number(idFromUrl);
        this.userGet = await this.userService.getProfile(userId);
        console.log(userId);
      }else{
        console.error('id not found in url')
      }
    } catch (error) {
       console.error('failed to load  edit user profile: ',error);
         this.errorMessage = 'ไม่สามารถโหลดข้อมูลโปรไฟล์ได้';
    }finally{
      this.isLoading = false;
    }
    
  }
saveProfile(): void {
    if (this.selectedImage) {
      localStorage.setItem('profileImage', this.selectedImage);
    }
   
    this.router.navigate(['/user/profile']);
  }
 profileImage: string = "assets/images/default-pfp.jpg"; // ค่าเริ่มต้น

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.profileImage = reader.result as string; // เปลี่ยนเป็นรูปใหม่
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

}
