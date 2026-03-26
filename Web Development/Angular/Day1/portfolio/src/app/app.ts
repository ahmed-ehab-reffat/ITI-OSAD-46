import { Component, signal } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Portfolio } from './portfolio/portfolio';
import { Contact } from './contact/contact';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, About, Skills, Portfolio, Contact, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}
