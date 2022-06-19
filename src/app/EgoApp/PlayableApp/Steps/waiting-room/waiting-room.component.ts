import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, Subject } from 'rxjs';
import { Alert } from 'src/app/Common/Class/alert.class';
import { ParamStorage } from 'src/app/Common/enums';
import { IQuizResponse } from 'src/app/Common/interfaces/quiz-response.interface';
import { StompService } from 'src/app/Service/stomp.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
  providers:[Alert, StompService]
})
export class WaitingRoomComponent implements OnInit,OnDestroy {

  public participantList: Array<{userName:string, typePlayer:string}>;
  public isLoading:boolean;
  public formName: string;
  private unsubscribe$: Subject<void>;
  private codeGame: string;

  protected quiz: IQuizResponse;
  protected userid: string;

  constructor(
    public stompService:StompService,
    private activatedRoute:ActivatedRoute,
    private alert: Alert,
  ) {
    this.unsubscribe$=new Subject;
    this.participantList = [];
    this.formName = 'FormName';
    this.isLoading=true;
  }
  ngOnDestroy(): void {
    this.onCloseWindow(null);
    // this.stompService.isConnected$.unsubscribe();
  }

  public getUserId() {
    this.userid = sessionStorage.getItem(ParamStorage.userId);
    this.activatedRoute.queryParams.subscribe(
      res => this.codeGame = res['codigo']
    );
    if (this.userid && this.codeGame) {
      console.log('getUserId ~ this.userid', this.userid);
      console.log('getUserId ~ this.codeGame', this.codeGame);

    } else {
      this.userid='67dccb00-698e-4038-b37e-8762cc7ef739';
      this.alert.alertError('Error', 'credenciales no encontradas');
    }
  }
  @HostListener('window:beforeunload', ['$event'])
  onCloseWindow(event: any): void {
    // this.stompClient.send(this.socketPrefixDestination + "/chat/"+this.codigo, {}, JSON.stringify(message))
    this.stompService.stompClient.send("/socket/leave/"+this.codeGame, {}, this.userid);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
 
  private loadParticipants(){
    this.participantList.splice(0);
    this.participantList= this.quiz.jugadores.map((player)=>{
      return {
        userName: player.username,
        typePlayer:player.tipoJugador,
      };
    });
    console.log('Participants',this.participantList);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.getUserId();
    this.subscribeToJoinPlayer();
    this.subscribeToLoungeStatus();
    this.subscribeToChat();
    this.subscribeToisConneted();
  }

  public startQuiz(){
    this.stompService.stompClient.send('/socket/room-status/' + this.codeGame, {}, JSON.stringify('S'));
    this.nextQuestion();
    // this.salaJuego.estadoSala = 'S';
  }
  public nextQuestion(){
    this.stompService.stompClient.send('/socket/manage-questions/' + this.codeGame, {});
  }

  private subscribeToisConneted(){
    this.stompService.isConnected$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res)=>{
      console.log('Is conected', res);
      this.singUpLounge();
    });
  }

  private subscribeToJoinPlayer(){
    this.stompService
    .subscribe('/list-players/'+this.codeGame,(payload: any)=>{
      console.log('PlayerLogin: ', JSON.parse(payload.body));
      if(this.quiz){
        this.quiz.jugadores=(JSON.parse(payload.body) as IQuizResponse).jugadores;
      }else{
        this.quiz=JSON.parse(payload.body);
        console.log("quiz",this.quiz)
        this.formName=this.quiz.tituloCuestionario;
        this.isLoading=false;
      }
      this.loadParticipants();
    },this.unsubscribe$);
  }
  private subscribeToLoungeStatus(){
    this.stompService.subscribe('/room-status/'+this.codeGame,(payload: any)=>{
      console.log('Lounge Status: ', payload);
    },this.unsubscribe$);
  }
  private subscribeToChat(){
    this.stompService.subscribe('/chat/'+this.codeGame,(payload: any)=>{
      console.log('ChatConnected: ', payload);
    },
    this.unsubscribe$
    );
  }
  
  private singUpLounge(){
    this.stompService.stompClient.send(
      '/socket/join/'+this.codeGame,
      {},
      this.userid
    );
  }
}
