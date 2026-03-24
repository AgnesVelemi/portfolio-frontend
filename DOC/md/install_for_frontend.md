# Installation & Setup Guide - Portfolio Frontend

This document provides a detailed, step-by-step guide to setting up and running the **Portfolio Frontend** application.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your system:

- **OS**: Windows 10/11 (x64 recommended)
- **Node.js**: v22.x (LTS) - Managed via [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases)
- **Angular CLI**: v19.x
- **IDE**: [Visual Studio Code](https://code.visualstudio.com/) with Angular extensions
- **Browser**: Chrome, Edge, or Firefox

---

## 🚀 Quick Start

If you already have the environment configured, simply run:

```bash
# Navigate to project directory
cd portfolio-frontend

# Install dependencies
npm install

# Start development server
ng serve
```
The application will be available at `http://localhost:4200`.

---

## 📦 Detailed Setup Strategy

### 1. Node.js Environment (via NVM)
It is highly recommended to use NVM (Node Version Manager) to handle multiple Node.js versions.

```bash
# Check available versions
nvm list available

# Install Node.js v22
nvm install 22
nvm use 22
```

### 2. Angular CLI Installation
```bash
npm install -g @angular/cli@19
```

### 3. Project Configuration
The project uses **SCSS** for styling and is configured for **Standalone Components** (Angular 19 feature).

#### Assets & Styling
- **Global Styles**: Defined in `src/styles.scss`.
- **Assets Paths**: Configured in `angular.json` to include both `public/` and `src/assets/`.

### 4. Internationalization (i18n)
The project supports English (**EN**) and German (**DE**).
- Translations are located in `src/assets/i18n/`.
- Managed via `LangService` (`src/app/i18n/lang.service.ts`).

---

## 🔗 Backend Connectivity

This frontend is designed to work with the **Portfolio Backend** (Spring Boot).

- **Backend Base URL**: `http://localhost:8080`
- **WebSocket Protocol**: STOMP over WebSockets
- **REST API**: Standard endpoints for data fetching and CV downloads.

> [!IMPORTANT]
> Ensure the backend project is running on port 8080 before testing WebSocket or REST features.

---

## 📊 Analytics Integration

The project includes **Google Analytics (GA4)** integration.
1. Add your **Measurement ID** (G-XXXXXXXXXX) in `src/index.html`.
2. The `GoogleAnalyticsService` handles event tracking.
3. A visual dashboard in the Hero component displays simulated "live" data fetched (mocked for demo) or piped from GA.

---

## 🔨 Build & Deployment

### Production Build
```bash
ng build --configuration production
```
The output will be in the `dist/portfolio-frontend/` directory.

### Running Unit Tests
```bash
ng test
```

---

## 📑 Additional Resources

- [Official Angular Documentation](https://angular.dev)
- [StompJs Documentation](https://stomp-js.github.io/stomp-websocket/crawling/2018/06/29/stomp-js-v5.html)
- [Portfolio Backend Repository](https://github.com/AgnesVelemi/portfolio-backend.git)
