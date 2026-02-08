import { Component, OnInit } from '@angular/core';
import { LangService } from '../../i18n/lang.service';


@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})

export class HeroComponent implements OnInit {

  showEmail: boolean = false;
  emailAddress: string = 'agnes.kommunikation@gmail.com';
  copySuccess: boolean = false;

  private emailTimeout: any;

  public actLang: string = 'en';

  /* Statistics (Mock Data for UI Demo) */
  visitorCount: number = 1240;
  cvDownloads: number = 42;
  langEnPercent: number = 60;
  langDePercent: number = 40;

  constructor(public langService: LangService) { }

  ngOnInit(): void {

    // Simulate "live" data changes slightly on load
    this.visitorCount += Math.floor(Math.random() * 10);
    this.cvDownloads += Math.floor(Math.random() * 5);

    // const fullPath = `${mainKey}.${nestedKey}`;

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

  copyToClipboard(): void {
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