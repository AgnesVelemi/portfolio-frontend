import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../i18n/lang.service';
// import SockJS from 'sockjs-client';  // <-- npm install --save-dev @types/sockjs-client
import { Client } from '@stomp/stompjs'; // <-- npm install sockjs-client @stomp/stompjs
import { Subject } from 'rxjs';
import { MessageToServer } from "./messageToServer";
import { MessageFromServer } from "./messageFromServer";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
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

  isConnected: boolean = false;
  stompClient: Client | null = null;

  responseSubject = new Subject<MessageFromServer>();
  latestMessage: MessageFromServer = { outMessage: 'n/a', timestamp: '' };

  constructor(public langService: LangService) { }

  ngOnInit(): void {
    // Simulate "live" data changes slightly on load
    this.visitorCount += Math.floor(Math.random() * 10);
    this.cvDownloads += Math.floor(Math.random() * 5);
  }

  t(key: string): string { // i18n helper
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

  /*------------------- [STOMP over WebSocket] -------------------*/
  connect(): void {
    if (this.isConnected && this.stompClient && this.stompClient.connected) {
      console.log('[Websocket] Already connected, skipping...');
      return;
    }

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
    }

    // Initialize the STOMP Client
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws/stomp',  // STOMP endpoint
      connectHeaders: {
        'client-type': 'frontend'  // Custom headers can be added here
      },
      debug: (str) => console.log('[Websocket Debug] ' + str),
      reconnectDelay: 5000,     // Delay before attempting to reconnect
      heartbeatIncoming: 4000,  // Wait for the incoming heartbeat from the server
      heartbeatOutgoing: 4000,  // Send an outgoing heartbeat to the server
    });

    // Connect to the STOMP broker
    this.stompClient.onConnect = (frame) => {
      this.isConnected = true; // Mark as connected only after success
      console.log('[STOMP Websocket] Connected: ' + frame);

      // Subscribe to STOMP topic
      this.stompClient?.subscribe('/topic/greetings', (greetingResponse: any) => {
        this.onMessageReceived(greetingResponse);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('[Websocket] Broker reported error: ' + frame.headers['message']);
      console.error('[Websocket] Additional details: ' + frame.body);
      this.isConnected = false;
    };

    this.stompClient.onWebSocketClose = () => {
      this.isConnected = false;
      console.log('[Websocket] Connection closed');
    };

    this.stompClient.activate();
  };

  disconnect(): void {
    console.log('[Websocket] Disconnecting...');
    if (this.stompClient != null) {
      this.stompClient.deactivate();
      this.isConnected = false;
      this.latestMessage = { outMessage: 'n/a', timestamp: '1970-01-01T00:00:00Z' };
    }
    console.log('[Websocket] Disconnected');
  }

  /* on error, schedule a reconnection attempt*/
  errorCallback(error: any) {
    console.error("WebSocket errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  send(messageText: string): void {
    if (!messageText) return;

    const message: MessageToServer = { payload: messageText };
    console.log('[Websocket] Sending message:', message);

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({  // FE-client sends message to BE-server via WS
        destination: "/app/greet",
        body: JSON.stringify(message),
        headers: {
          'client-type': 'frontend'  // Include the custom header here
        }
      });
      console.log('[Websocket] Sent message:', JSON.stringify(message));
    } else {
      console.error('[Websocket] Cannot send message, not connected');
    }
  }

  onMessageReceived(gotMessageFromServer: any) {
    console.log("[Websocket] Received message from server: " + gotMessageFromServer.body);
    const obj = JSON.parse(gotMessageFromServer.body) as MessageFromServer; // parse the message from the server into JSON->object
    this.latestMessage = obj;
    this.responseSubject.next(obj);
  }

  formatWSDate(isoStr: string | undefined): string {
    if (!isoStr || isoStr === '1970-01-01T00:00:00Z') return 'YYYY-MON-DD HH:mm ZONE';

    const date = new Date(isoStr);
    if (isNaN(date.getTime())) return 'YYYY-MON-DD HH:mm ZONE';

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Get timezone offset in "UTC+01" format
    const offsetMin = -date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMin) / 60);
    const sign = offsetMin >= 0 ? '+' : '-';
    const tz = `UTC${sign}${String(offsetHours).padStart(2, '0')}`;

    return `${year}-${month}-${day} ${hours}:${minutes} ${tz}`;
  }
}
