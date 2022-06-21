import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, Subject } from 'rxjs';
import { Alert } from 'src/app/Common/Class/alert.class';
import { nav, PLAYER_TYPE } from 'src/app/Common/constants';
import { ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { PlayerType } from 'src/app/Common/enums/player-type.enum';
import { IQuestionResponse } from 'src/app/Common/interfaces/question-response.interface';
import { IQuizResponse } from 'src/app/Common/interfaces/quiz-response.interface';
import { StompService } from 'src/app/Service/stomp.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
  providers:[Alert, StompService]
})
export class WaitingRoomComponent implements OnInit,OnDestroy {

  public isLoading:boolean;
  public formName: string;
  public codeGame: string;
  public currentQuestion: IQuestionResponse;

  public participantList: Array<{userName:string, typePlayer:string}>;

  private isInGame:boolean;
  private unsubscribe$: Subject<void>;

  protected quiz: IQuizResponse;
  protected userid: string;

  constructor(
    public stompService:StompService,
    private activatedRoute:ActivatedRoute,
    private alert: Alert,
    private router:Router
  ) {
    this.unsubscribe$=new Subject;
    this.participantList = [];
    this.formName = 'FormName';
    this.isInGame=false;
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
      // this.userid='67dccb00-698e-4038-b37e-8762cc7ef739';
      this.alert.alertError('Error', 'credenciales no encontradas',()=>{
        this.router.navigate(nav(RouterNavigate.CHECK_IN));
      });
    }
  }
  @HostListener('window:beforeunload', ['$event'])
  onCloseWindow(event: any): void {
    if(!this.isInGame){ // ? si la accion NO es redireccionar a la parte de preguntas, el sistema ejecuta un leave 
      this.stompService.stompClient.send("/socket/leave/"+this.codeGame, {}, this.userid);
    }
    this.unsubscribe$.next();
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
    this.subscribeToCurrectQuestion();
  }
  private checkMaster(){
    this.quiz.jugadores.map((player)=>{
      if(player.tipoJugador === PlayerType.MASTER){
        if(this.userid === player.idUsuario){
          console.log("MasterDetectado");
          console.log("Direccionado");
          this.router.navigate(nav(RouterNavigate.MASTER_ROOM),{queryParams: {codigo: this.codeGame}});
        }
      }
    })
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
  private subscribeToCurrectQuestion(){
    this.stompService
    .subscribe('/questions/'+this.codeGame,(payload: any)=>{
      console.log('Questions: ', JSON.parse(payload.body));
      this.currentQuestion=JSON.parse(payload.body) as IQuestionResponse;
      localStorage.setItem(ParamStorage.currectQuestion,payload.body);
      this.isInGame=true;
      this.router.navigate(nav(RouterNavigate.QUESTION_STEP),{queryParams: {codigo: this.codeGame}});
    },this.unsubscribe$);
  }
  private subscribeToJoinPlayer(){
    this.stompService
    .subscribe('/list-players/'+this.codeGame,(payload: any)=>{
      console.log('PlayerLogin: ', JSON.parse(payload.body));
      if(this.quiz){
        this.quiz.jugadores=(JSON.parse(payload.body) as IQuizResponse).jugadores;
      }else{
        this.quiz=JSON.parse(payload.body);
        sessionStorage.setItem(ParamStorage.questionsNumber,this.quiz.numeroDePreguntas.toString());
        sessionStorage.setItem(ParamStorage.currectQuestion,'1');
        console.log("quiz",this.quiz)
        this.formName=this.quiz.tituloCuestionario;
        this.isLoading=false;
      }
      this.checkMaster();
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
