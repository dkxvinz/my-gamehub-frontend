import { RouterModule, Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Registerpage } from './pages/registerpage/registerpage';
import { Loginpage } from './pages/loginpage/loginpage';
import { Editprofile } from './pages/editprofile/editprofile';
import { AuthGuard } from './services/api/authGuard';
import { HomepageAdmin } from './pages/homepage-admin/homepage-admin';
import { Cartpage } from './pages/cartpage/cartpage';
import { Profile } from './pages/profile/profile';
import { GameDetail } from './pages/game-detail/game-detail';
import { TopupPage } from './pages/topup-page/topup-page';
import { MygameDetail } from './pages/mygame-detail/mygame-detail';
import { Mygamehub } from './pages/mygamehub/mygamehub';
import { Transpage } from './pages/transpage/transpage';
import { EditAdminProfile } from './pages/edit-admin-profile/edit-admin-profile';
import { CreateGame } from './pages/create-game/create-game';
import { CreateDiscount } from './pages/create-discount/create-discount';
import { UserHistory } from './pages/user-history/user-history';
import { AdminProfile } from './pages/admin-profile/admin-profile';

export const routes: Routes = [
  { path: 'homepage', component: Homepage},
  { path: 'loginpage', component: Loginpage },
  { path: 'registerpage', component: Registerpage },

  // User pages
{ path: 'user/home', component: Homepage, canActivate: [AuthGuard], data: { role: 1 } },
{ path: 'user/cart/:id', component:Cartpage, canActivate: [AuthGuard], data: { role: 1 } },
{ path: 'user/profile/:id', component:Profile, canActivate: [AuthGuard], data: { role: 1 } },
{ path: 'user/edit-profile/:id', component:Editprofile, canActivate: [AuthGuard], data: { role: 1 } },
{ path: 'user/game-detail', component:GameDetail, canActivate: [AuthGuard], data: { role: 1 } },
{ path: 'user/top-up/:id', component:TopupPage, canActivate: [AuthGuard], data: { role: 1 } },
{ path: 'user/mygamehub/:id', component:Mygamehub, canActivate: [AuthGuard], data: { role: 1 } },
{ path: 'user/mygame-detail', component:MygameDetail, canActivate: [AuthGuard], data: { role: 1 } },
{ path: 'user/transpage/:id', component:Transpage, canActivate: [AuthGuard], data: { role: 1 } },

// Admin pages
{ path: 'admin/home', component: HomepageAdmin, canActivate: [AuthGuard], data: { role: 0 } },
{ path: 'admin/edit-admin-profile/:id', component: EditAdminProfile, canActivate: [AuthGuard], data: { role: 0 } },
{ path: 'admin/create-game', component: CreateGame, canActivate: [AuthGuard], data: { role: 0 } },
{ path: 'admin/create-discount', component: CreateDiscount, canActivate: [AuthGuard], data: { role: 0 } },
{ path: 'admin/create-game', component: CreateGame, canActivate: [AuthGuard], data: { role: 0 } },
{ path: 'admin/user-trans', component: UserHistory, canActivate: [AuthGuard], data: { role: 0 } },
{ path: 'admin/admin-profile/:id', component: AdminProfile, canActivate: [AuthGuard], data: { role: 0 } },

// // Redirect default
{ path: '', redirectTo: '/homepage', pathMatch: 'full' },
{ path: '**', redirectTo: '/profile' },

 
];
