import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login(name: string) {
    localStorage.setItem('user', JSON.stringify({ name }));
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserName(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : '';
  }
}
