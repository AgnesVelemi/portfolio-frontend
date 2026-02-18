# STOMP over WebSocket for GA4
To connect to the Google Analytics 4 (GA4) Realtime API, you can use the STOMP over WebSocket protocol. That is the goal of this document.

## Protocols
  * The STOMP protocol is a **S**imple **T**ext-based **M**essaging **P**rotocol that is used to send messages between clients and servers. 
  * WebSocket is a protocol that provides full-duplex communication bidirectional channels over a single TCP connection in real-time without the need for a separate connection for each direction.
  * TCP is a connection-oriented protocol that provides reliable, ordered, and error-checked delivery of data, as part of the Internet Protocol Suite.
  * Internet Protocol Suite is a set of communication protocols used to interconnect networked devices on the Internet.
  * In OSI model, TCP is a transport layer protocol, and WebSocket is an application layer protocol.

## Define the Greeting interface 
* [ x ]create manually the greeting.ts interface in hero component folder
```typescript
export interface Greeting {
    content: string;
    when: any;
}
```
## Define the Message interface
* [ x ] create manually the message.ts interface in hero component folder
```typescript
export interface Message {
    name: string;
    when: any;
}
```

## Installation on Angular 19
* [ x ] npm install --save-dev @types/sockjs-client
* [ x ] npm install sockjs-client @stomp/stompjs

## Enhancement of the hero.component.ts 
* [ x ] Add the following imports to the hero.component.ts file:
```typescript
import SockJS from 'sockjs-client';     // <-- npm install --save-dev @types/sockjs-client
import { Stomp } from '@stomp/stompjs'; // <-- npm install sockjs-client @stomp/stompjs
```

## Fix for Angular 19 in index.html
That is the cause of the empty white web page! 
 Older libraries like sockjs-client expect a variable named ***global*** to exist, 
 but modern frameworks like Angular 19 don't provide it by default.
 Add the bellow small **"polyfill"** script to fix this:

```html
<!-- fix for Angular 19.  -->
<script>
  if (global === undefined) {
    var global = window;
  }
</script>
</html>
```
## Build the Angular application
* [ x ] npm run build

## Google Cloud Project
* [ x ] Create Google Cloud Project
* [ x ] Enable Google Analytics API
* [ x ] Create Service Account
* [ x ] Download Service Account JSON
* [ x ] Add Service Account to Google Analytics
* [ x ] Create WebSocket Server
* [ x ] Create Angular STOMP Client
* [ x ] Connect to WebSocket Server
* [ x ] Subscribe to GA4 Realtime API
* [ x ] Display GA4 Realtime Data 


## Google Analytics 4 (GA4) Realtime API

* [GA4 Realtime API](https://developers.google.com/analytics/devguides/reporting/realtime/v1/user-guide)
* [GA4 Realtime API Reference](https://developers.google.com/analytics/devguides/reporting/realtime/v1/rest/v1beta/properties.runRealtimeReport)

## STOMP over WebSocket

* [STOMP over WebSocket](https://stomp.github.io/stomp-over-websocket.html)

## Angular STOMP over WebSocket

* [Angular STOMP over WebSocket](https://www.npmjs.com/package/@stomp/stompjs)


