import { Component, signal } from '@angular/core';
import {RouterOutlet,RouterLink,RouterLinkActive, Router} from '@angular/router';
import { Header } from './header/header';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Header,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 
}
