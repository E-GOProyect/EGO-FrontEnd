import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { URLS } from '../Common/enums';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private connecting: boolean = false;
  private topicQueue: any[] = [];
  public isConnected$: Subject<boolean>;
  socket = new SockJS(URLS.API + '/game');
  stompClient = Stomp.over(this.socket);

  constructor() {
    this.isConnected$ = new Subject();
    this.isConnected$.next(false);
  }

  subscribe(topic: string, callback: any): void {
    // If stomp client is currently connecting add the topic to the queue
    if (this.connecting) {
      this.topicQueue.push({
        topic,
        callback,
      });
      return;
    }

    const connected: boolean = this.stompClient.connected;
    if (connected) {
      // Once we are connected set connecting flag to false
      this.connecting = false;
      this.subscribeToTopic(topic, callback);
      return;
    }

    // If stomp client is not connected connect and subscribe to topic
    this.connecting = true;
    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);

      // Once we are connected loop the queue and subscribe to remaining topics from it
      this.topicQueue.forEach((item: any) => {
        this.subscribeToTopic(item.topic, item.callback);
      });

      this.isConnected$.next(true);

      // Once done empty the queue
      this.topicQueue = [];
    });
  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(topic, (response?: string): any => {
      callback(response);
    });
  }
}
