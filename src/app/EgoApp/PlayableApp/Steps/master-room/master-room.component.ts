import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alert } from 'src/app/Common/Class/alert.class';
import { nav } from 'src/app/Common/constants';
import { LoungeStatus, ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { PlayerType } from 'src/app/Common/enums/player-type.enum';
import { IQuizResponse } from 'src/app/Common/interfaces';
import { IQuestionResponse } from 'src/app/Common/interfaces/question-response.interface';
import { StompService } from 'src/app/Service/stomp.service';

@Component({
  selector: 'app-master-room',
  templateUrl: './master-room.component.html',
  styleUrls: ['./master-room.component.scss'],
  providers:[Alert, StompService],

})
export class MasterRoomComponent implements OnInit, OnDestroy {

  public loungeStatus:string= 'A';
  public isLoading:boolean;
  public formName: string;
  public curretQuestion: IQuestionResponse;
  public stateStarted: LoungeStatus = LoungeStatus.STARTED;
  public currentNumberQuestion: number;
  public numberQuestions: number;

  public participantList: Array<{userName:string, typePlayer:string}>;

  public startTime: Subject<boolean>;
  public resetTime: Subject<boolean>;

  public codeGame: string;
  private unsubscribe$: Subject<void>;

  protected quiz: IQuizResponse;
  protected userid: string;


  constructor(
    public stompService:StompService,
    private activatedRoute:ActivatedRoute,
    private alert: Alert,
    private router:Router

  ) { 
    this.isLoading=true;
    this.startTime=new Subject();
    this.resetTime=new Subject();
    this.unsubscribe$=new Subject;
    this.participantList = [];
    this.formName = 'FormName';
    this.currentNumberQuestion=1;
  }
  ngOnDestroy(): void {
    this.onCloseWindow(null);
    this.stompService.isConnected$.unsubscribe();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.startTime.next(false);
    this.getAccess();
    this.subscribeToisConneted();
    this.subscribeToLoungeStatus();
    this.subscribeToJoinPlayer();
    this.subscribeToCurrectQuestion();
  }
  public getAccess(){
    this.activatedRoute.queryParams.subscribe(
      res => this.codeGame = res['codigo']
    );
    if(!this.codeGame){
      this.alert.alertError('Oh No!', 'Hubo un error con el codigo de juego, regresando al inicio',()=>{
        this.onReturnCheckIn()
      });
    }
    this.userid = sessionStorage.getItem(ParamStorage.userId);
    // this.userid='67dccb00-698e-4038-b37e-8762cc7ef739';

    if(!this.userid){
      this.alert.alertError('Oh No!', 'Hubo un error en las credenciales, regresando a checkIn',()=>{
        this.onReturnCheckIn()
      });
    }
    
  }
  public onReturnCheckIn(){
    this.router.navigate(nav(RouterNavigate.CHECK_IN));
  }
  @HostListener('window:beforeunload', ['$event'])
  onCloseWindow(event: any): void {
    this.stompService.stompClient.send("/socket/leave/"+this.codeGame, {}, this.userid);
    this.unsubscribe$.next();
  }
  private onFinishedQuiz(){
    this.stompService.stompClient.send('/socket/room-status/' + this.codeGame, {}, JSON.stringify(LoungeStatus.FINISHED));
    this.loungeStatus='F';
  }
  public verifyCredentials(){
    this.quiz.jugadores.map((player)=>{
      if(player.tipoJugador===PlayerType.MASTER){
        if(this.userid!==player.idUsuario){
          this.alert.alertError(
            'Error de Credenciales!', 
            'Hubo un error en las credenciales, regresando a checkIn',
            ()=>{this.onReturnCheckIn()}
          );
        }
      }
    });
  }
  private loadParticipants(){
    this.participantList.splice(0);
    this.participantList= this.quiz.jugadores.map((player)=>{
      return {
        userName: player.username,
        typePlayer:player.tipoJugador,
      };
    });
    console.log('entro en loadPart',this.participantList);

  }
 
  public comenzarPregunta(){
    this.startTime.next(true);
  }

  public onResetTime(){
    this.resetTime.next(true);
  }
  private subscribeToisConneted(){
    this.stompService.isConnected$.subscribe((res)=>{
      console.log('Is conected', res);
      this.singUpLounge();
    });
  }
  private subscribeToLoungeStatus(){
    this.stompService.subscribe('/room-status/'+this.codeGame,(payload: any)=>{
      console.log('Lounge Status: ', JSON.parse(payload.body));
      this.loungeStatus=JSON.parse(payload.body);
    },this.unsubscribe$);
  }
  public startQuiz(){
    this.stompService.stompClient.send('/socket/room-status/' + this.codeGame, {}, JSON.stringify(LoungeStatus.STARTED));
    this.nextQuestion();
    // this.salaJuego.estadoSala = 'S';
  }
  public nextQuestion(){
    this.stompService.stompClient.send('/socket/manage-questions/' + this.codeGame, {});
    console.log('Pasando pregunta');
    this.currentNumberQuestion++;
    sessionStorage.setItem(ParamStorage.currectQuestion,this.currentNumberQuestion.toString());

  }
  private subscribeToCurrectQuestion(){
    this.stompService
    .subscribe('/questions/'+this.codeGame,(payload: any)=>{
      console.log('Questions: ', JSON.parse(payload.body));
      this.curretQuestion=JSON.parse(payload.body) as IQuestionResponse;
    },this.unsubscribe$);
  }
  private subscribeToJoinPlayer(){
    this.stompService.subscribe('/list-players/'+this.codeGame,(payload: any)=>{
      console.log('PlayerLogin: ', JSON.parse(payload.body));
      if(this.quiz){
        this.quiz.jugadores=(JSON.parse(payload.body) as IQuizResponse).jugadores;
      }else{
        this.quiz=JSON.parse(payload.body);
        console.log("quiz",this.quiz)
        sessionStorage.setItem(ParamStorage.questionsNumber,this.quiz.numeroDePreguntas.toString());
        sessionStorage.setItem(ParamStorage.currectQuestion,'1');
        this.numberQuestions=this.quiz.numeroDePreguntas;
        this.formName=this.quiz.tituloCuestionario;
        this.isLoading=false;
        this.verifyCredentials();
      }
      this.loadParticipants();
    },this.unsubscribe$);
  }
  private singUpLounge(){
    this.stompService.stompClient.send(
      '/socket/join/'+this.codeGame,
      {},
      this.userid
    );
  }
}
