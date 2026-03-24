# 🚀 Portfolio Frontend - Fullstack Angular Anwendung

[![Angular](https://img.shields.io/badge/Angular-19-dd0031.svg?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6db33f.svg?logo=springboot)](https://github.com/AgnesVelemi/portfolio-backend.git)

[🇺🇸 Englische Version (README.md)](README.md) | [📖 Detaillierte Installationsanleitung](DOC/md/install_for_frontend.md)

Dies ist die Frontend-Komponente einer **Fullstack-Portfolio-Website**, entwickelt mit **Angular 19**. Sie bietet Echtzeitkommunikation über STOMP-WebSocket, RESTful API-Integration und Internationalisierung.

---

## 🏗️ Fullstack Architektur

Dieses Projekt ist keine eigenständige statische Seite, sondern Teil eines verteilten Systems:

- **Frontend**: Angular 19 (TypeScript, SCSS, Standalone-Komponenten).
- **Backend**: [Portfolio Backend (Spring Boot)](https://github.com/AgnesVelemi/portfolio-backend.git).
- **Echtzeit-Interaktion**: STOMP über WebSockets für bidirektionale Kommunikation.
- **REST APIs**: RESTful Endpunkte für Standard-Datenaustausch und Dateiverwaltung.

### Kommunikationsprotokoll
Das Frontend interagiert mit dem Backend (läuft auf `localhost:8080`) über:
1.  **REST (HTTP)**: 
    *   **CV Download**: `/api/cv/{lang}` - Lädt den neuesten Lebenslauf basierend auf der Sprachauswahl herunter.
2.  **WebSocket (STOMP)**:
    *   **Endpunkt**: `ws://localhost:8080/ws/stomp`
    *   **Veröffentlichung**: Nachricht an `/app/greet`.
    *   **Abonnement**: Hört auf `/topic/greetings` für Echtzeitnachrichten vom Server.

---

## ✨ Portfolio Highlights

Die `PortfolioComponent` präsentiert eine Auswahl an Software-Engineering-Projekten:

| Projektname | Technologie-Stack | Hauptmerkmale |
| :--- | :--- | :--- |
| **Portfolio Website** | Angular, GA4 | Professionelle UI mit Google Analytics 4 Integration. |
| **Dashboard AAA** | Maven Multi-project | Enterprise-Dashboard-Struktur mit Microservice-Readiness. |
| **DogBlogger** | Spring Boot | Skalierbare Backend-Architektur unter Verwendung von Microservice-Mustern. |
| **Flat Renovation Calculator** | Fullstack | Integrierter Zahlungsabwicklungsprozess innerhalb eines Microservice-Ökosystems. |
| **IT Knowledge Base** | Angular, Spring Boot | CRUD-Operationen mit Echtzeit-Updates und Microservice-Integration. |

---

## 🛠️ Erweiterte Funktionen

- **Google Analytics Integration**: Maßgeschneiderter `GoogleAnalyticsService` zur Analyse des Nutzerverhaltens.
- **Dynamische Lokalisierung**: Volle Unterstützung für Englisch und Deutsch über einen eigenen `LangService`.
- **STOMP Client**: Robuste WebSocket-Client-Verwaltung mit automatischer Wiederverbindung.
- **Responsives Design**: Premium SCSS-Layout mit Fokus auf Visual Excellence.

---

## 🚀 Erste Schritte

So können Sie das Frontend lokal testen:

1.  **Repository klonen**:
    ```bash
    git clone https://github.com/AgnesVelemi/portfolio-frontend.git
    cd portfolio-frontend
    ```
2.  **Abhängigkeiten installieren**:
    ```bash
    npm install
    ```
3.  **Entwicklungsserver starten**:
    ```bash
    ng serve
    ```
4.  **Backend-Voraussetzung**:
    Stellen Sie sicher, dass das [Portfolio Backend](https://github.com/AgnesVelemi/portfolio-backend.git) auf `http://localhost:8080` läuft.

---

## 🤝 Kontakt

**Agnes Velemi** - Fullstack Entwicklerin
- GitHub: [@AgnesVelemi](https://github.com/AgnesVelemi)
- Dokumentation: [install_for_frontend.md](DOC/md/install_for_frontend.md)

---
*Entwickelt mit Fokus auf Fullstack Excellence.*
