import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl :'./login.css'
})
export class Login {

  email = '';
  password = '';
  submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.submitted = true;

    if (!this.email || !this.password) return;

    // using email as username for demo
    this.auth.login(this.email);
    this.router.navigate(['/home']);
  }
}
