import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { User } from './pages/user/user';
import { authGuard } from './auth-guard-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'user/:id', component: User },
 {
    path: 'contact',
    component: Contact,
    canActivate: [authGuard]
    
  }
];
