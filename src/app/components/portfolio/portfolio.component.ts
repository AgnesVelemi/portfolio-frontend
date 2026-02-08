import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../i18n/lang.service';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {

  showEmail: boolean = false;
  emailAddress: string = 'agnes.kommunikation@gmail.com';
  copySuccess: boolean = false;
  actLang: string = 'en'; // Default language

  private emailTimeout: any;

  constructor(public langService: LangService) { }

  /* Statistics (Mock Data for UI Demo) */
  visitorCount: number = 1240;
  cvDownloads: number = 42;
  langEnPercent: number = 60;
  langDePercent: number = 40;

  ngOnInit(): void {
    // Simulate "live" data changes slightly on load
    this.visitorCount += Math.floor(Math.random() * 10);
    this.cvDownloads += Math.floor(Math.random() * 5);

    this.updateVisibleCards();
    window.addEventListener('resize', () => this.updateVisibleCards());
  }

  t(key: string): string {
    return this.langService.translate(key);
  }

  toggleEmail(): void {
    this.showEmail = !this.showEmail;

    // Clear any existing timer to prevent conflicts
    if (this.emailTimeout) {
      clearTimeout(this.emailTimeout);
      this.emailTimeout = null;
    }

    if (this.showEmail) {
      // Auto-hide after 5 seconds
      this.emailTimeout = setTimeout(() => {
        this.showEmail = false;
        this.copySuccess = false; // Reset copy status when hiding
      }, 5000);
    } else {
      this.copySuccess = false;
    }
  }

  copyEmailToClipboard(): void {
    navigator.clipboard.writeText(this.emailAddress).then(() => {
      this.copySuccess = true;

      // Clear existing timeout to restart the countdown
      if (this.emailTimeout) {
        clearTimeout(this.emailTimeout);
      }

      // Close the popover after 3 seconds
      this.emailTimeout = setTimeout(() => {
        this.showEmail = false;
        this.copySuccess = false;
        this.emailTimeout = null;
      }, 3000);
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  }

  /* Discord Popover Logic */
  showDiscord: boolean = false;
  discordUsername: string = 'agnesvelemi';
  discordCopySuccess: boolean = false;
  private discordTimeout: any;

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

  toggleDiscord(): void {
    this.showDiscord = !this.showDiscord;

    // Clear any existing timer to prevent conflicts
    if (this.discordTimeout) {
      clearTimeout(this.discordTimeout);
      this.discordTimeout = null;
    }

    if (this.showDiscord) {
      // Auto-hide after 5 seconds
      this.discordTimeout = setTimeout(() => {
        this.showDiscord = false;
        this.discordCopySuccess = false; // Reset copy status when hiding
      }, 5000);
    } else {
      this.discordCopySuccess = false;
    }
  }

  copyDiscordToClipboard(): void {
    navigator.clipboard.writeText(this.discordUsername).then(() => {
      this.discordCopySuccess = true;

      // Clear existing timeout to restart the countdown
      if (this.discordTimeout) {
        clearTimeout(this.discordTimeout);
      }

      // Close the popover after 3 seconds
      this.discordTimeout = setTimeout(() => {
        this.showDiscord = false;
        this.discordCopySuccess = false;
        this.discordTimeout = null;
      }, 3000);
    }).catch(err => {
      console.error('Failed to copy discord username: ', err);
    });
  }


}

