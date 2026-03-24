# 🚀 Portfolio Frontend - Fullstack Angular Application

[![Angular](https://img.shields.io/badge/Angular-19-dd0031.svg?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6db33f.svg?logo=springboot)](https://github.com/AgnesVelemi/portfolio-backend.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🇩🇪 German Version (README_DE.md)](README_DE.md) | [📖 Detailed Setup Guide](DOC/md/install_for_frontend.md)

This is the frontend component of a **Fullstack Portfolio Website**, built with **Angular 19**. It features real-time communication via STOMP overWebSocket, RESTful API integration, and internationalization.

---

## 🏗️ Fullstack Architecture

This project is not a standalone static site. It is part of a distributed system:

- **Frontend**: Angular 19 (TypeScript, SCSS, Standalone Components).
- **Backend**: [Portfolio Backend (Spring Boot)](https://github.com/AgnesVelemi/portfolio-backend.git).
- **Real-time Interaction**: STOMP over WebSockets for bi-directional communication.
- **REST APIs**: Restful endpoints for standard data exchange and asset management.

### Communication Protocol
The frontend interacts with the backend (running on `localhost:8080`) through:
1.  **REST (HTTP)**: 
    *   **CV Download**: `/api/cv/{lang}` - Fetches the latest CV based on the UI language selection.
2.  **WebSocket (STOMP)**:
    *   **Endpoint**: `ws://localhost:8080/ws/stomp`
    *   **Publication**: Sent to `/app/greet`.
    *   **Subscription**: Listens to `/topic/greetings` for real-time server-sent messages.

---

## ✨ Portfolio Highlights

The `PortfolioComponent` showcases a curated list of software engineering projects:

| Project Name | Technology Stack | Key Features |
| :--- | :--- | :--- |
| **Portfolio Website** | Angular, GA4 | Professional UI with Google Analytics 4 integration. |
| **Dashboard AAA** | Maven Multi-project | Enterprise-grade dashboard structure with microservice readiness. |
| **DogBlogger** | Spring Boot | Scalable backend architecture utilizing microservice patterns. |
| **Flat Renovation Calculator** | Fullstack | Integrated payment processing flow within a microservice ecosystem. |
| **IT Knowledge Base** | Angular, Spring Boot | CRUD operations with real-time updates and microservice integration. |

---

## 🛠️ Advanced Features

- **Google Analytics Integration**: Custom `GoogleAnalyticsService` tracking user engagement and language preferences.
- **Dynamic Localization**: Full support for English and German via a custom `LangService`.
- **STOMP Client**: Robust WebSocket client management with auto-reconnection and heartbeat handling.
- **Responsive Design**: Premium, mobile-first SCSS layout.

---

## 🚀 Getting Started

To explore the frontend locally:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/AgnesVelemi/portfolio-frontend.git
    cd portfolio-frontend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    ng serve
    ```
4.  **Backend Requirement**:
    Ensure the [Portfolio Backend](https://github.com/AgnesVelemi/portfolio-backend.git) is running on `http://localhost:8080` for full functionality.

---

## 📑 Remote Origin Check

To verify your remote configuration:
```bash
git remote get-url origin
# Expected: https://github.com/AgnesVelemi/portfolio-frontend.git
```

---

## 🤝 Contact

**Agnes Velemi** - Fullstack Developer
- GitHub: [@AgnesVelemi](https://github.com/AgnesVelemi)
- Documentation: [install_for_frontend.md](DOC/md/install_for_frontend.md)

---
*Created with focus on Fullstack mastery.*
