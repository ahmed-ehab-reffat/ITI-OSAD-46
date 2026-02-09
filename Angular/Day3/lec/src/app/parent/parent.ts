import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child } from '../child/child'; 

@Component({
  selector: 'app-parent',
  standalone : true,
  imports: [RouterOutlet,Child],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent {
// 🔹 Child → Parent
  messageFromChild = '';

  receiveMessage(message: string) {
  this.messageFromChild = message;
}

}
