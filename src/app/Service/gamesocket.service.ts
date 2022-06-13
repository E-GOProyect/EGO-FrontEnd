import { Injectable } from "@angular/core";
import * as SockJS from 'sockjs-client';
import { URLS } from "../Common/enums";
import Stomp from "stompjs";
import { ActivatedRoute } from "@angular/router";



@Injectable({
    providedIn: 'root',
})
export class StompService{
    socket = new SockJS(URLS.API);
    stompClient = Stomp.over(this.socket,'/game');
    private socketPrefixDestination = "/socket";
    private codigo:string;
    constructor(
        private activatedRoute: ActivatedRoute
    ) { }
    
    public async startSesion(
        userId:string,
        onError:(err: any)=>void,
        onMessageReceived?:(payload: any)=>void, 
        onJoinPlayer?:(payload: any)=>void,
        onLoungeStatus?:(payload: any)=>void,
        onQuestion?:(payload: any)=>void,
        ){
        this.activatedRoute.queryParams.subscribe(
            (res) => this.codigo = res['codigo']
        );
        this.stompClient.connect(
            {}, // ? {}=>Headers 
            this.onConnect( // ? Durante la coneccion 
                userId,
                onMessageReceived,
                onJoinPlayer,
                onLoungeStatus,
                onQuestion
            ), 
            onError
        );
    }

    
    // subscribe(topic: string, callback: any):  void {
    //     const connect: boolean = this.stompClient.connected;
    //     if(connect){
    //         this.subscribeToTopic(topic,callback);
    //     }
    // }

    private onConnect = ( 
        userId:string,
        onMessageReceived?:(payload: any)=>void, 
        onJoinPlayer?:(payload: any)=>void,
        onLoungeStatus?:(payload: any)=>void,
        onQuestion?:(payload: any)=>void,
    ) => {
        this.stompClient.subscribe("chat/"+this.codigo, onMessageReceived)
        this.stompClient.subscribe("join-player/"+this.codigo, onJoinPlayer);
        this.stompClient.subscribe("estado-sala/"+this.codigo, onLoungeStatus);
        this.stompClient.subscribe("pregunta/"+this.codigo, onQuestion);
        this.stompClient.send(this.socketPrefixDestination + "/join/" + this.codigo, {}, userId)
    }
    
}