import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <button (click)="sendMessage()">
      Send Message to Parent
    </button>
  `
})
export class Child {

 @Output() message = new EventEmitter<string>();

sendMessage() {
  this.message.emit('Hello Parent');
}

}
