import { Component } from '@angular/core';
import { MessageService } from '../../services/message';

@Component({
 selector: 'app-contact',
  standalone: true,
  templateUrl :'./contact.html'
})
export class Contact {
 message = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessage().subscribe(data => {
      this.message = data;
    });
  }
}
