import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { URLS } from '../Common/enums';
import Stomp from 'stompjs';
// import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class GameSockectService {
  socket:any;
  stompClient:any;
  private userId:string;
  private socketPrefixDestination = '/socket';
  private codigo: string;
  
  constructor(){
  }

  public async startSesion(
    userId: string,
    onError?: (err: any) => void,
  ) {
    this.stompClient = Stomp.over(new SockJS(URLS.API), '/game');
    await this.stompClient.connect(
      {}, // ? {}=>Headers
      this.connectSocket(
        // ? Durante la coneccion
        userId
      ),
      onError
    );
  }

  public setCode(code: string) {
    this.codigo = code;
  }

  private connectSocket (
    userId: string
  ) {
    this.stompClient.send(
        this.socketPrefixDestination + '/join/' + this.codigo,
        {},
        userId
    );
    this.stompClient.subscribe('/chat/' + this.codigo, (payload: any) =>{});
    this.stompClient.subscribe('/join-player/' + this.codigo, (payload: any) =>{});
    this.stompClient.subscribe('/estado-sala/' + this.codigo, (payload: any) =>{});
    this.stompClient.subscribe('/pregunta/' + this.codigo, (payload: any) =>{});
    
  };
  public getInRoom(userId: string){
    this.stompClient.send(
        this.socketPrefixDestination + '/join/' + this.codigo,
        {},
        userId
    );
  }
  public setUserId(userId: string){
    this.userId=userId;
  }
}
