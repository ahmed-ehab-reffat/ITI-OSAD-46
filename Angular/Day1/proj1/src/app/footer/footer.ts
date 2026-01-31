import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  constructor() {
    if (typeof document !== 'undefined') {
      const y = new Date().getFullYear();
      const el = document.getElementById('year');
      if (el) el.textContent = String(y);
    }
  }
}
