import { Component } from '@angular/core';
import { LangService } from '../../i18n/lang.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentLang = 'en';

  constructor(public langService: LangService) {
    this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  switchLang(lang: 'en' | 'de') {
    this.langService.switchLang(lang);
  }

  t(key: string): string {
    return this.langService.translate(key);
  }


  openCV() {
    const cvFile = this.currentLang === 'de'
      ? 'assets/DOC/VelemiAgnesCV_2026_Jan_DE.pdf'
      : 'assets/DOC/VelemiAgnesCV_2026_Jan_EN.pdf';

    (window as any).gtag('event', 'cv_download', {
      event_category: 'engagement',
      event_label: this.currentLang
    });

    window.open(cvFile, '_blank');
  }

}


