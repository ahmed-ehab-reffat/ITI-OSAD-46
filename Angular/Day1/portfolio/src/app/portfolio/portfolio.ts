import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  projects = [
    {
      title: 'Mentally',
      summary: 'A platform for mental health support and resources.',
      description:
        'Next.js application using Tailwind CSS, next-intl, Typescript, and other technologies.',
      image: '/mentally.jpg',
      live: 'https://mentally-eight.vercel.app/',
      repo: 'https://github.com/ahmed-ehab-reffat/mentally',
      type: 'Web',
    },
    {
      title: 'Project Two',
      summary: 'Another project about Y',
      description: 'Detailed description of Project Two and technologies used.',
      image: 'https://via.placeholder.com/600x350',
      live: '#',
      repo: '#',
      type: 'Web',
    },
    {
      title: 'Project Three',
      summary: 'Tooling and automation demo',
      description: 'Detailed description of Project Three and technologies used.',
      image: 'https://via.placeholder.com/600x350',
      live: '#',
      repo: '#',
      type: 'Tool',
    },
  ];
  filtered = [...this.projects];
  active: any = null;

  filter(type: string) {
    if (type === 'all') this.filtered = [...this.projects];
    else this.filtered = this.projects.filter((p) => p.type === type);
  }

  open(p: any) {
    this.active = p;
  }
  close() {
    this.active = null;
  }
}
