import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './authservice';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'] ,
  imports: [
    CommonModule,        // *ngIf, *ngFor
    RouterOutlet,        // <router-outlet>
    RouterLink,          // routerLink
    RouterLinkActive     // routerLinkActive
  ],
})
export class App {

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  get userName(): string {
    return this.auth.getUserName();
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
