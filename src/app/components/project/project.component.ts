import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../i18n/lang.service';


@Component({
  selector: 'app-project',
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})

export class ProjectComponent implements OnInit {

  actLang: string = 'en'; // Default language


  constructor(public langService: LangService) { }

  ngOnInit(): void {

  }


  t(key: string): string {
    return this.langService.translate(key);
  }

  /* Slider Logic */
  projects = [
    { id: 1, translationKey: 'PROJECT_1', image: 'assets/img/project_img_portfolio_siampledev.png', url: 'http://localhost:4200/#' },
    { id: 2, translationKey: 'PROJECT_2', image: 'assets/img/project_img_siampledev.png', url: 'https://siample.dev' },
    { id: 3, translationKey: 'PROJECT_3', image: 'assets/img/project_img_AWSsiampledev.png', url: 'https://aws.siample.dev' },
    { id: 4, translationKey: 'PROJECT_4', image: 'assets/img/project_img_portfolio_siampledev.png', url: 'http://localhost:4200/#' },
    { id: 5, translationKey: 'PROJECT_5', image: 'assets/img/project_img_portfolio_siampledev.png', url: 'http://localhost:4200/#' }
  ];

  /* Navigation Methods */
  openProject(url: string): void {
    if (url.includes('localhost') || url.startsWith('#')) {
      window.open(url, '_self');
    } else {
      window.open(url, '_blank');
    }
  }

  currentIndex: number = 0;
  visibleCards: number = 3;





  updateVisibleCards(): void {
    const width = window.innerWidth;
    if (width < 768) {
      this.visibleCards = 1;
    } else if (width < 1100) {
      this.visibleCards = 2;
    } else {
      this.visibleCards = 3;
    }
  }

  get maxIndex(): number {
    return Math.max(0, this.projects.length - this.visibleCards);
  }

  nextProject(): void {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    }
  }

  prevProject(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToProject(index: number): void {
    // Clamp the index so we don't scroll into empty space
    this.currentIndex = Math.min(index, this.maxIndex);
  }

  // Helper to check if a project is within the current visible window
  // This is used for the dots navigation and potentially for active classes
  isProjectVisible(index: number): boolean {
    return index >= this.currentIndex && index < this.currentIndex + this.visibleCards;
  }

}
