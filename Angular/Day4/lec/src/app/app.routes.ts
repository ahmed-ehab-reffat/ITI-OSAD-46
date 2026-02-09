import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { User } from './pages/user/user';
import { AuthGuard } from './auth-guard-guard';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [

  //  Protected pages
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'contact', component: Contact, canActivate: [AuthGuard] },
  { path: 'user/:id', component: User, canActivate: [AuthGuard] },

  //  Public pages
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  //  Default redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //  Fallback
  { path: '**', redirectTo: 'login' }
];
