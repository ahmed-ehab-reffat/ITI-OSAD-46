import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html'
})
export class Dashboard {
  isAdmin = true;

  users = [
    { name: 'Reem', role: 'Admin' },
    { name: 'Ahmed', role: 'User' },
    { name: 'Sara', role: 'User' }
  ];
}
