import { Component } from '@angular/core';
import { AuthService } from '../authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl:'./login.css'
})
export class Login {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login();
    this.router.navigate(['/home']);
  }
}
