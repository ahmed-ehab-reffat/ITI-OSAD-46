import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  template: `
    <h2>User Details</h2>
    <p>User ID: {{ userId }}</p>
  `
})
export class User {
  userId!: string;

  constructor(private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];
  }
  
}
