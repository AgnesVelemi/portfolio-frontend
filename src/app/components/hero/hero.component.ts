import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../i18n/lang.service';
import SockJS from 'sockjs-client';  // <-- pm install --save-dev @types/sockjs-client
import { Stomp } from '@stomp/stompjs'; // <-- npm install sockjs-client @stomp/stompjs
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


  /*Websocket related*/
  isConnected: boolean = false;
  stompClient: any;
  responseSubject = new Subject<MessageFromServer>();
  latestMessage: MessageFromServer = { outMessage: 'n/a', timestamp: '' };

  constructor(public langService: LangService) { }

  ngOnInit(): void {

    // Simulate "live" data changes slightly on load
    this.visitorCount += Math.floor(Math.random() * 10);
    this.cvDownloads += Math.floor(Math.random() * 5);

  }



  /* i18n*/
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

  /*------------------- [WebSocket] -------------------*/
  connect(): void {
    console.log('[Websocket] Connecting...');
    this.isConnected = true; // Synchronous state update for immediate UI feedback

    let websocket = new SockJS('http://localhost:8080/ws/stomp'); // registy.add-ed websocket endpoint
    this.stompClient = Stomp.over(websocket);

    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/topic/greetings', (greetingResponse: any) => {
        this.onMessageReceived(greetingResponse);
      });
    }, (error: any) => this.errorCallback(error));
  };


  disconnect(): void {
    console.log('[Websocket] Disconnecting...');
    if (this.stompClient != null) {
      this.stompClient.disconnect();
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
    this.stompClient.send("/app/greet", {}, JSON.stringify(message)); // FE-client sends message to BE-server via WS
    console.log('[Websocket] Sent message:', JSON.stringify(message));
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
