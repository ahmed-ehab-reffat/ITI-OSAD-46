import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../authservice';
import { ProductService } from '../../product/product';
import { CommonModule } from '@angular/common';
import { User } from '../user/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[CommonModule],
 templateUrl : './home.html'
})
export class Home {

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}
products: any[] = [];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
   counter = signal(0);
   users = signal<User[]>([]);
  

  increment() {
    this.counter.update(v => v + 1);
  }
  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
    
  }


}
