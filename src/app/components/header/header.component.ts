import { Component } from '@angular/core';
import { LangService } from '../../i18n/lang.service';
import { environment } from '../../../environments/environment';

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
    const url = `${environment.apiUrl}/api/cv/${this.currentLang}`;
    window.open(url, '_blank');
  }


}


