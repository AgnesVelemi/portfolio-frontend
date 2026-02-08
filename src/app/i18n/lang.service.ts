import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TRANSLATIONS } from './translations';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  private langSubject = new BehaviorSubject<string>('en');
  lang$ = this.langSubject.asObservable();

  private translations = TRANSLATIONS;

  get currentLang(): string {
    return this.langSubject.value;
  }

  switchLang(lang: 'en' | 'de') {
    this.langSubject.next(lang);
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key; // fallback
    }

    return String(value);
  }
}
