import {Component} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverUrl = 'http://localhost:8888/socket';
  title = 'WebSockets chat';
  stompClient;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          $('.chat').append('<div class=\'message\'>' + message.body + '</div>');
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/send/message', message);
    $('#input').val('');
  }

}
