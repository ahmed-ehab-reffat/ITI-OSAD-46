import { Component } from '@angular/core';
import { MessageService } from '../services/message';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html'
})
export class Dashboard {
 
 message = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessage().subscribe(data => {
      this.message = data;
    });
  }

}
