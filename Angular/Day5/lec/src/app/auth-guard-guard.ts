import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './authservice';

export const AuthGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/login']);
};


// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './authservice';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {

//   constructor(
//     private auth: AuthService,
//     private router: Router
//   ) {}

//   canActivate(): boolean {
//     if (this.auth.isLoggedIn()) {
//       return true;
//     }

//     this.router.navigate(['/login']);
//     return false;
//   }
// }
