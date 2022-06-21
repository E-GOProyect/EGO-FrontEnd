import { Component, OnInit, OnDestroy, HostListener, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { Subject } from 'rxjs';
import { Alert } from 'src/app/Common/Class/alert.class';
import { nav } from 'src/app/Common/constants';
import { LoungeStatus, ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { IAnswered, IScorePlayerResponse } from 'src/app/Common/interfaces';
import { IQuestionResponse } from 'src/app/Common/interfaces/question-response.interface';
import { CuestionarioService } from 'src/app/Service/cuestionario.service';
import { StompService } from 'src/app/Service/stomp.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [StompService,Alert]
})
export class QuestionComponent implements OnInit,OnDestroy {
  public countdownConfig:CountdownConfig;
  public questionName: string;
  public isLoading: boolean;
  public isAwaiting:boolean;
  public currentQuestionNumber:number;
  public loungeStatus: string;
  public scoreTable:Array<IScorePlayerResponse>;
  public timeLeft:number;
  public maxTime: number;

  public startTimer: Subject<boolean>;
  public resetTime: Subject<boolean>;

  private codeGame: string;
  public quizQuestion: IQuestionResponse;
  private chosenOption: number;
  private unsubscribe$: Subject<void>;
  protected userid: string;

  constructor(
    public stompService:StompService,
    public cuestionarioService: CuestionarioService,
    private activatedRoute: ActivatedRoute,
    private alert: Alert,
    private router:Router,
  ) {
    this.unsubscribe$=new Subject();
    this.startTimer=new Subject();
    this.resetTime=new Subject();
    this.isLoading=true;
    this.isAwaiting=false;
   }
  ngOnDestroy(): void {
    this.onCloseWindow(null);
  }
  @HostListener('window:beforeunload', ['$event'])
  onCloseWindow(event: any): void {
    this.unsubscribe$.next();
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      res => this.codeGame = res['codigo']
    );
    if(!this.codeGame){
      this.alert.alertError('Oh No!', 'No se encontro el codigo de juego, regresando a checkIn',()=>{
        this.onReturnCheckIn()
      });
    }
    this.userid = sessionStorage.getItem(ParamStorage.userId);
    if(!this.userid){
      this.alert.alertError('Oh No!', 'Hubo un error en las credenciales, regresando a checkIn',()=>{
        this.onReturnCheckIn()
      });
    }
    this.resetTime.next(true);
    this.currentQuestionNumber= JSON.parse(sessionStorage.getItem(ParamStorage.currentQuestionNumber));
    if(this.currentQuestionNumber){
      this.currentQuestionNumber=1;
    }
    this.reloadQuestion();
    this.subscribeToQuestion();
    this.subscribeToLoungeStatus();
    this.subscribeToPlayerScore();
  }
  
  public onReturnCheckIn(){
    this.router.navigate(nav(RouterNavigate.CHECK_IN));
  }
  public onTimeLeft(timeLeft:number){
    console.log(timeLeft);
    this.timeLeft=20-timeLeft;
  }
  public reloadQuestion(){

    this.quizQuestion=JSON.parse(localStorage.getItem(ParamStorage.currectQuestion));
    if(!this.quizQuestion){
      this.alert.alertError('Oops!', 'Ocurrio un error al momento de cargar la pregunta, regresando a checkIn',()=>{
        this.onReturnCheckIn()
      });
    }
    this.isLoading=false;
    this.timeLeft=0;
    console.log('resetSend');
    this.resetTime.next(true);
  }
  private subscribeToQuestion(){
    this.stompService
    .subscribe('/questions/'+this.codeGame,(payload: any)=>{
      console.log('ActualQuestion: ',JSON.parse(payload.body));
      localStorage.setItem(ParamStorage.currectQuestion,payload.body);
      this.reloadQuestion();
      this.isAwaiting=false;
      this.currentQuestionNumber++;
    },this.unsubscribe$);
    
  }
  public onChooseAnswered(idOpcion:number){
    console.log('respuesta: ',idOpcion);
    this.chosenOption=idOpcion;
    this.sendAnswered();
    this.isAwaiting=true;
  }
  public onSkipQuestion(){
    this.isAwaiting=true;
  }
  public onTimeOut(isTimeOut:boolean){
    console.log('tiemout',isTimeOut);
    this.isAwaiting=true;
  }
  public reset(){
    this.resetTime.next(true);
  }
  public parseNumberToLetter(num:number): string{
    switch(num){
      case 0: return 'A';
      case 1: return 'B';
      case 2: return 'C';
      case 3: return 'D';
    }
    return '';
  }
  private subscribeToPlayerScore(){
    this.stompService.subscribe('/answered/'+this.codeGame,(payload: any)=>{
      console.log('answered: ', JSON.parse(payload.body));
      this.scoreTable=JSON.parse(payload.body).filter((player)=>{
        return player.tipoJugador!=='M';
      });
      this.scoreTable.sort((valA,valB)=>{
        if(valA.cantidadPuntos===valB.cantidadPuntos){
          return 0;
        }
        return valA.cantidadPuntos<valB.cantidadPuntos? -1:1;
      });
    },this.unsubscribe$);
  }
  public async sendAnswered(){
    const answered= {
      idJugador: this.userid,
      idOpcion: this.chosenOption,
      tiempoDemoradoMS: this.timeLeft*1000, // TODO: en milisegundos 1000 es 1s 
    }as IAnswered;
    this.stompService.stompClient.send('/socket/question-answered/'+this.codeGame,{},JSON.stringify(answered));
    console.log('response de anwserd', answered);
  }
  private onFinishedQuiz(){
    sessionStorage.setItem(ParamStorage.scoreTable,JSON.stringify(this.scoreTable));
    console.log('Quiz finalizado');
    this.router.navigate(nav(RouterNavigate.RESULT));

  }
  private subscribeToLoungeStatus(){
    this.stompService.subscribe('/room-status/'+this.codeGame,(payload: any)=>{
      console.log('Lounge Status: ', JSON.parse(payload.body));
      this.loungeStatus=JSON.parse(payload.body);
      if(this.loungeStatus===LoungeStatus.FINISHED){
        this.onFinishedQuiz();
      }
    },this.unsubscribe$);
  }

}
