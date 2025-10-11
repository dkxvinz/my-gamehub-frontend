import { Component } from '@angular/core';
import { Header } from "../header/header";
import { UsersGetRes } from '../../model/user_get_res';
import { ProtectedService } from '../../services/api/protectAPI';
import { Router } from '@angular/router';
import { UsersService } from '../../services/api/users';

@Component({
  selector: 'app-homepage-admin',
  imports: [Header],
  templateUrl: './homepage-admin.html',
  styleUrl: './homepage-admin.scss'
})
export class HomepageAdmin {
isLoggedIn: boolean = true;

person?: UsersGetRes | null;
  userData: any | undefined;
constructor(private protectedService: ProtectedService,private router:Router,private userService:UsersService) {}

 async ngOnInit() {
    this.protectedService.getProtectedData().subscribe({
      next: (res) => this.userData = res,
      error: (err) => console.error('Error fetching protected data', err)
    });

    // this.router.paramMap.subscribe(params =>{
    //   const 
    // })
  }

logout() {
  localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/loginpage']);
}

}
