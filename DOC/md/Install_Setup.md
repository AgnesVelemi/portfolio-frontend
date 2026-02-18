# portfolio-frontend

## Just Run

```bash
BE_portfolio>ng serve
```
* stop: CTRL+C

## Departure checklist

* [ ] OS: Windows 11 x64
* [ ] IDE: Visual Studio Code 2026, or Antigravity
* [ ] Browser: Chrome, Edge, Firefox
* [ ] HIGHLY RECOMMENDED! 
      * Notepad++ https://notepad-plus-plus.org/downloads/
      * Total Commander https://www.totalcmd.org/download.html
* [ ] Google analytics account https://analytics.google.com
* [ ] Git https://git-scm.com/download/win download for windows 
* [ ] GitHub account https://github.com/
* [ ] Download & install **nvm-setup.exe** latest nvm exe version https://github.com/coreybutler/nvm-windows/releases
* [ ] Restart Windows MANDATORY!

***

* [ ] nvm v --> 1.2.2 so okay, I have installed nvm.

### Select compatible TLS versions

* [ ] c:> nvm list available
* [ ] https://angular.dev/reference/versions 
  ![Same Directory Image](Version_compatibility.png)

### Install NodeJS v22 --> Angular 19

* [ ] c:> nvm install 22
* [ ] c:> nvm list
* [ ] c:> nvm use 22.22.0
* [ ] c:> nvm list
* [ ] c:> npm install -g @angular/cli@19
* [ ] c:> ng v
  
  ![Same Directory Image](Installed_for_Angular_project.png)

### Create new Angular project

* [ ] c:\ws\2026> ng new portfolio-frontend
  *  √ Which stylesheet format would you like to use? Sass (SCSS) 
  *  ? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? (y/N) 
     * No Enter
* [ ] c:\ws\2026> cd portfolio-frontend
* [ ] c:\...\portfolio-frontend> ng serve
  * http://localhost:4200/ → CTRL+C
  * you can see here the default app.component.html filecontent:

  ![Same Directory Image](Empty_Ang_Project.png)

### Create components
* [ ] c:\...\portfolio-frontend> ng generate component components/header
* [ ] c:\...\portfolio-frontend> ng generate component components/hero
* [ ] c:\...\portfolio-frontend> ng generate component components/portfolio
* [ ] c:\...\portfolio-frontend> ng g c                components/project
* [ ] c:\...\portfolio-frontend> ng g c                components/footer
* [ ] c:\...\portfolio-frontend> ng serve ➜  http://localhost:4200/ → CTRL+C

* [ ] app.component.html --> delete all content --> embed components

```html
<app-header></app-header>
<main>
  <app-hero></app-hero>
  <app-portfolio></app-portfolio>
  <app-project></app-project>
</main>
<app-footer></app-footer>
```

* [ ] app.component.ts   --> modify its content --> import components

```typescript
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectComponent } from "./components/project/project.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, PortfolioComponent, FooterComponent, ProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
```
 ![Same Directory Image](Empty_Ang_ProjComponents.png)

### src/styles.scss --> fill out with root styles, style variables, etc.
```scss
      /* You can add global styles to this file, and also import other style files */
/* Global Styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
    --bg-color: #021a2f;
    --text-color: #ffffff;
    --accent-color: #1e90ff;
    --card-bg: #0f2b44;
    --font-family: 'Inter', sans-serif;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: var(--font-family);
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

* {
    box-sizing: border-box;
}

h1,h2,h3,h4,h5,h6 {
    margin: 0;
    font-weight: 700;
}

a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s;
}

button {
    cursor: pointer;
    border: none;
    font-family: inherit;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
```
![local picture: styles.scss](src_style_scss.png)

## angular.json file modification for assets (images, icons, etc.)
* [ ] Complete the angular.json file with assets path either in "build" or "test" environments besides "public" folder: 
     ```javascript
        "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "/assets"
              }
            ],
     ```

### icons integration from https://icons8.com/ in .png format
* [ ] Copy the icons to the src/assets/favi/head or foot folder
* [ ] Use the icons in the components with each belonging downloag link for free usage like (eg. in footer component)
       ```html
           <a target="_blank" href="https://icons8.com/icon/B2IOVIpQTs05/short-film">Short Film</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
       ```

* [ ] See the whole icon-code:
   ```html
           <div class="logo">
            <img src="assets/favi/foot/icons8-short-film-gradient-96.png" alt="Logo" class="logo-img"
                onerror="this.onerror=null; this.src='data:image/gif;base64,yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'">

            <div class="attribution-bubble">
                <a target="_blank" href="https://icons8.com/icon/B2IOVIpQTs05/short-film">Short Film</a> icon by <a
                    target="_blank" href="https://icons8.com">Icons8</a>
            </div>
            <span>FILM</span>
        </div>
   ```

### make favicon to unique in src/index.html
* [ ] in src/index.html change the default favicon to your own
* [ ] Comment out the default favicon.ico link from index.html
  ```html
    <!doctype html>
    <html lang="en">
    <head>
      <!-- Google tag (gtag.js) --> 
      <meta charset="utf-8">
      <title>Portfolio</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!--<link rel="icon" type="image/x-icon" href="favicon.ico"> -->
      <link rel="icon" type="image/png" 
            href="/assets/favi/head/icons8-leaf-outline-gradient-32_black.png">
    </head>
    <body>
      <app-root></app-root>
    </body>
    </html>
    ```

    * [ ] CTRL + F5    refresh need!

     ![local picture: styles.scss](src_style_index.png)



### i18n integration
* 1; [ ] Make manually the language files:
  * src/assets/i18n/lang/en.json, de.json (Coding UTF-8)
    ```javascript
     {
      "HEADER": {
        "HOME": "HOME",
        "PROJECTS": "PROJEKTE",
        "SERVICES": "GIT-CODES",
        "CONTACT": "LEBENSLAUF",
        "LETS_TALK": "LASS UNS REDEN"
      },
      "HERO": {
        "GREETING_PREFIX": "A V",
        "NAME": "ICH BIN A", etc.
      }
     }
    ```

* 2; [ ] Complete the angular.json file with assets path either in "build" or "test" section besides "public" folder: 
     ```javascript
        "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "/assets"
              }
            ],
      ```

* 3; [ ] Creating lang service
     ```bash
        c:\...\portfolio-frontend> ng g s i18n/lang 
        - CREATE src/app/i18n/lang.service.spec.ts (363 bytes)
        - CREATE src/app/i18n/lang.service.ts (142 bytes)
     ```
 * Important! The lang service is created in the src/app/i18n brand newfolder!

* 4; [ ] Create manually the translation.ts empty file
  * c:\...\portfolio-frontend\src\app\i18n\translation.ts
  * The translation.service takes the en.json and de.json files and puts them into the TRANSLATIONS object.
      ```typescript
            import en from '../../assets/i18n/en.json';
            import de from '../../assets/i18n/de.json';
            
            export const TRANSLATIONS: any = {
              en,
              de
            };
         ```

* 5; [ ] portfolio-frontend/src/app/i18n/lang.service.ts
     * The lang.service takes the TRANSLATIONS object and puts it into the lang$ BehaviorSubject. 
     * The lang.service is **Injectable** and has a BehaviorSubject that emits the current language.
     * The **switchLang method**   switches the language.
     * The **translate method** returns the translation.  
      ```typescript
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
       ```

* 6; [ ] header.component.ts - import lang.service and use its methods
  * subscribes to the lang$ BehaviorSubject and updates the currentLang variable.
  * calls t --> translate method, switchLang method from the lang.service

```typescript
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

   openCV() { }
}
```
* 7; [ ] header.component.html 
  * calls t --> translate method, switchLang method
  * + leaf icon not available onerror --> fallback to data:image/gif;base64,yH5BAEAAAAALAAAAAABAAEAAAIBRAA7

```html
<header>
    <div class="container header-content">
        <div class="logo">
            <img src="../../../assets/favi/head/icons8-leaf-outline-gradient-96.png" alt="Logo" class="logo-img"
                onerror="this.onerror=null; this.src='data:image/gif;base64,yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'">
            <div class="attribution-bubble">
                <a target="_blank" href="https://icons8.com/icon/axHsVz6TmtLr/leaf">Leaf</a> icon by <a target="_blank"
                    href="https://icons8.com">Icons8</a>
            </div>
            <span>AGNES</span>
        </div>
        <nav>
            <ul>
                <li><a href="#">{{ t('HEADER.PROJECTS') }}</a></li>
                <li><a href="#">{{ t('HEADER.SERVICES') }}</a></li>
                <li><a href="javascript:void(0)" (click)="openCV()">{{ t('HEADER.CONTACT') }}</a></li>
            </ul>
        </nav>
        <div class="actions">
            <button class="lang-btn" (click)="switchLang('en')" [class.active]="currentLang === 'en'">EN</button>
            <span class="divider">|</span>
            <button class="lang-btn" (click)="switchLang('de')" [class.active]="currentLang === 'de'">DE</button>
            <button class="cta-btn">{{ t('HEADER.LETS_TALK') }}</button>
        </div>
    </div>
</header>
```
![i18n_okay](i18n_okay.png)

## hero component additional features
* [ ] SVP placeholder picture on error with grey user silhouette directly into the code.
  ```html
        <div class="image-column">
            <div class="image-wrapper">
                <img src="assets/me/whitey_face.png"
                    onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 500\'%3E%3Crect width=\'400\' height=\'500\' fill=\'%23334155\'/%3E%3Ccircle cx=\'200\' cy=\'200\' r=\'80\' fill=\'%2394a3b8\'/%3E%3Cpath d=\'M200 300c-66.7 0-120 53.3-120 120h240c0-66.7-53.3-120-120-120z\' fill=\'%2394a3b8\'/%3E%3C/svg%3E'"
                    alt="Selfie">
            </div>
        </div>
    ```

![svg_pict_onerror](svg_pict_onerror.png)

* [ ] background decorative elements
  ```css
        &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image:
            url('/assets/favi/head/icons8-leaf-outline-gradient-96.png'),
            url('/assets/favi/head/icons8-leaf-outline-gradient-96.png');
        background-position:
            5% 5%,
            50% 85%;
        background-repeat: no-repeat;
        background-size: 300px;
        opacity: 0.15;
        z-index: 0;
        pointer-events: none;
    }
    ```
* [ ] mocked data for "live" analytics
  ```typescript
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

      }
    ```

### Git issues
* [ ] making the remote empty repo on https://github.com/
      * new repository: portfolio-frontend 
* [ ] github.com/AgnesVelemi/portfolio-frontend
* [ ] Git-2.52.0-64-bi.exe do install! You will have GitBash.

```bash
git init
git add README.md
git add .
git add --all
git commit -m "first commit"
git branch -M main

git config --global user.email "a.k@gmail.com"
git config --global user.name "AgnesVelemi"

git remote add origin https://github.com/AgnesVelemi/portfolio-frontend.git
git push -u origin main
```

* [ ] or push an existing repository from the command line
```bash
git remote add origin https://github.com/un/portfolio-frontend.git
git branch -M main
git push -u origin main
```

### Google Analytics Integration

#### Theory
* Normally, Google Analytics is a ONE-WAY street: Your Website ---> sends data to ---> Google Analytics (Visualized in their Dashboard)
* To show that data (e.g. "150 Visitors") back on your website, it becomes a TWO-WAY street. You need to ask Google for that data. To do that, you need a Google Analytics Data API Key eg. via a Spring Boot backend.

* Need a backend: That API Key is like a password. If you put it in your Angular code (Frontend), anyone who visits your site can steal it and access your Google account data. The Solution: You create a small "middleman" (Backend) that runs securely on a server.

  * Frontend asks Backend: "Hey, give me the visitor count."
  * Backend (holding the secret Key) asks Google: "Here is my Key, give me the count."
  * Backend gives the number to Frontend.

#### Technical Implementation
 Create a Google Analytics Account (free) and after a few data giving you get a Measurement ID (starts with G-xxxxxxxx). To get a Google Analytics ID:
   ![pnghere](google_analytics.png)

    1. Login with your google account on https://analytics.google.com
    2. Click "Start measuring" or "Admin" -> "Create Account"
    3. Account Setup: Enter an Account Name (e.g., "My Portfolio").
    4. Property Setup: Enter a Property Name (e.g., "Portfolio Website").
    5. Business Details: Select standard options (category/size).
    6. Platform: choose "Web".
    7. Data Stream: enter your website URL (eg. https://portfolio.siample.dev or a placeholder if deploying later) and Stream Name.
    8. Click "Create stream".
    9. You will then see a screen with a MEASUREMENT ID in the top right corner. It looks like G-XXXXXXXXXX. Copy the "Measurement ID" (starts with G-)
    10. tagmanager-noreply@google.com will send you an email with the script. 
    11. Copy it immediately after the <head> element in index.html.


   ```html
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());

      gtag('config', 'G-XXXXXXXXXX');
    </script>
   ```
* index.html is the root file of the application. It is the entry point of the application. It is the first file that is loaded when the application is loaded. 
```html
    <!doctype html>
    <html lang="en">
    <head>
      <!-- Google tag (gtag.js) --> 
      <meta charset="utf-8">
      <title>Portfolio</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!--<link rel="icon" type="image/x-icon" href="favicon.ico"> -->
      <link rel="icon" type="image/png" 
            href="/assets/favi/head/icons8-leaf-outline-gradient-32_black.png">
    </head>
    <body>
      <app-root></app-root>
    </body>
    </html>
   ```  
   *[ ] CTRL+F5 --> refresh the page!


* [ ] Google Analytics UI with simulated data
  * hero component scss contents a lot of "dashboard" styles

  ```typescript
        import { Component, OnInit } from '@angular/core';
        import { LangService } from '../../i18n/lang.service';
        import { GoogleAnalyticsService } from '../../services/google-analytics.service';

        @Component({
          selector: 'app-hero',
          imports: [],
          templateUrl: './hero.component.html',
          styleUrl: './hero.component.scss'
        })
        export class HeroComponent implements OnInit {

      /* Statistics (Mock Data for UI Demo) */
      visitorCount: number = 1240;
      cvDownloads: number = 42;
      langEnPercent: number = 60;
      langDePercent: number = 40;

      constructor(
        public langService: LangService,
        private googleAnalytics: GoogleAnalyticsService) { }

      ngOnInit(): void {

        // Simulate "live" data changes slightly on load
        this.visitorCount += Math.floor(Math.random() * 10);
        this.cvDownloads += Math.floor(Math.random() * 5);

        }
    }
    ```
* [ ] Google Analytics UI 
![pnghere](google_an_UI.png) 
  ```html
       <!-- Google Analytics Dashboard (Visual Demo) -->
      <div class="stats-dashboard">
          <div class="dashboard-header">
              <span class="pulse"></span>
              <h4>Live Google Analytics</h4>
          </div>
          <div class="dashboard-grid">
              <div class="dash-item">
                  <span class="label">{{ t('HERO.VISITORS') }}</span>
                  <span class="value">{{ visitorCount }}</span>
              </div>
              <div class="dash-item">
                  <span class="label">{{ t('HERO.CV_DOWNLOADS') }}</span>
                  <span class="value">{{ cvDownloads }}</span>
              </div>
              <div class="dash-item full-width">
                  <span class="label">{{ t('HERO.LANGUAGE_PREFERENCE') }}</span>
                  <div class="progress-bar">
                      <div class="progress-segment en" [style.width.%]="langEnPercent" title="English">
                          EN {{ langEnPercent }}%
                      </div>
                      <div class="progress-segment de" [style.width.%]="langDePercent" title="German">
                          DE {{ langDePercent }}%
                      </div>
                  </div>
              </div>
          </div>
      </div>
    ```
#### Check Google Analytics
* [ ] Changes index.html: Added the Google Global Site Tag (gtag.js) to the <head> section. Configured with Measurement ID: G-1234567891.
* [ ] Code Check: View the index.html  source and confirm the script is present.
* [ ] Live Check: Open the running app in your browser (http://localhost:4200). Open Developer Tools -> Network tab. Refresh the page. Filter for collect or gtag. You should see requests going to google-analytics.com or googletagmanager.com. (Note: Ad blockers often block these requests, so disable them for localhost if you don't see anything).

## Copy to Clipboard
```html
<div class="email-wrapper">
    <span class="icon" (click)="toggleEmail()">@</span>
    <div class="email-popover" *ngIf="showEmail">
        <span class="address">{{ emailAddress }}</span>
        <button (click)="copyEmailToClipboard()" class="copy-btn" [class.copied]="copySuccess">
            {{ copySuccess ? 'Copied!' : 'Copy' }}
        </button>
    </div>
</div>
```
![copy-to-clipboard.png](copy_to_clipboard.png)

### Pagination-dots
```html
<div class="pagination-dots">
    <span class="dot" *ngFor="let dot of [1, 2, 3, 4, 5]" [class.active]="dot === currentPage"></span>
</div>
```
```typescript
  goToProject(index: number): void {
    // Clamp the index not to scroll into empty space
    this.currentIndex = Math.min(index, this.maxIndex);
  }
```
## sticky-footer is always on the bottom of the page
 ```scss
.sticky-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--card-bg);
    /* Use card background or accent for contrast */
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: #abaaaa;
    padding: 10px 0;
    z-index: 1000;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    backdrop-filter: blur(10px);
```
![sticky-footer.png](sticky_footer.png)

## Color
* colorpicker: https://websitestylekit.com/


***
***

## What is?
* NVM = Node Version Manager?
  * NVM is a tool that lets you install, keep and switch between multiple versions of NODE.JS on the same computer.

* angular.json = Angular configuration file?
  * The angular.json configuration is pointing to the public folder for assets, but my images are in src/assets. I plan to update the configuration to include src/assets as well. Please review the plan.
    * input: "src/assets": Tells Angular to look for files in this folder.
    * output: "/assets": Tells Angular to copy these files to an assets folder in the final built application (e.g., http://localhost:4200/assets/...).
    * glob: "**/*": Includes all files and subdirectories.

* How to install the latest LTS versions of NodeJS compatible with Angular?
  * [ ] c:> nvm list available
  * [ ] https://nodejs.org/en/download
  * [ ] c:> nvm install 24.13.0
  * [ ] c:> nvm use     24.13.0
  * [ ] c:> nvm list
  * [ ] c:> npm install -g @angular/cli@latest
  * [ ] c:> ng version

* ng serve --> starts running a local development server!


### onError handling for png pictures
Modifying the onerror attribute to use a transparent 1x1 pixel base64 image is suggested. This is a very short and robust fix that avoids external dependencies (like via.placeholder.com) and prevents infinite loops if the fallback image also fails to load.

```html
   onerror="this.onerror=null; this.src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP'"
   onerror="this.onerror=null; this.src='data:image/gif;base64,yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'"
```

## Code scaffolding
```bash
ng generate --help
npm run build
ng build --configuration production
ng build      
```

## Building
This **ng build** command will compile your project run and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests
To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests
For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.


