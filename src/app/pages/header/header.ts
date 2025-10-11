import { Component, Injectable, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {  Router,RouterLink} from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService} from '../../services/api/auth';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule,RouterLink,NgIf],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})


export class Header{

 profileImage: string = "assets/images/default-pfp.jpg";
 userId?: number;
 

  constructor(public authService: AuthService,public router:Router){}




  logout(){
   this.authService.logout();
   this.router.navigate(['/homepage']);
  }
}
