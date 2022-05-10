import { Injectable } from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { URLS } from "../Common/enums";

@Injectable({
    providedIn: 'root',
})
export class StompService{
    socket = new SockJS(URLS.WEBSOCKET_CHATROOM);
    stompClient = Stomp.over(this.socket);

    subscribe(topic: string, callback: any):  void {
        const connect: boolean = this.stompClient.connected;
        if(connect){
            this.subscribeToTopic(topic,callback);
        }
    }

    private subscribeToTopic(topic:string,callback:any):void {
        this.stompClient.subscribe(topic,(): any => {
            callback();
        })
    }
}
