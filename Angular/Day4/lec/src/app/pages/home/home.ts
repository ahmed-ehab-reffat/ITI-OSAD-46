import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule],
  standalone: true,
  templateUrl:'./home.html'
})
export class Home {
  constructor(private router: Router) {}
isLoggedIn = true
  goToContact() {
  if (this.isLoggedIn) {
    this.router.navigate(['/contact']);
  } else {
    alert('Please login first');
  }
}


}