import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alert } from 'src/app/Common/Class/alert.class';
import { nav } from 'src/app/Common/constants';
import { ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { IQuizResponse } from 'src/app/Common/interfaces';
import { StompService } from 'src/app/Service/stomp.service';

@Component({
  selector: 'app-master-room',
  templateUrl: './master-room.component.html',
  styleUrls: ['./master-room.component.scss'],
  providers:[Alert],

})
export class MasterRoomComponent implements OnInit, OnDestroy {

  public participantList: Array<{userName:string, typePlayer:string}>;
  protected quiz: IQuizResponse;
  public isLoading:boolean;

  public startTime: Subject<boolean>;
  public resetTime: Subject<boolean>;
  private codeGame: string;
  protected userid: string;
  public formName: string;

  constructor(
    public stompService:StompService,
    private activatedRoute:ActivatedRoute,
    private alert: Alert,
    private router:Router

  ) { 
    this.isLoading=true;
    this.startTime=new Subject();
    this.resetTime=new Subject();
    this.participantList = [];
    this.formName = 'FormName';

  }
  ngOnDestroy(): void {
    this.onCloseWindow(null);
    this.stompService.isConnected$.unsubscribe();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.startTime.next(false);
    // this.userid='67dccb00-698e-4038-b37e-8762cc7ef739';
    this.getAccess();
    this.subscribeToisConneted();
    this.subscribeToLoungeStatus();
    this.subscribeToJoinPlayer();
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
    // this.stompClient.send(this.socketPrefixDestination + "/chat/"+this.codigo, {}, JSON.stringify(message))
    this.stompService.stompClient.send("/socket/leave/"+this.codeGame, {}, this.userid);
  }
  public verifyCredentials(){
    this.quiz.jugadores.map((player)=>{
      if(player.tipoJugador==='M'){
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
      console.log('Lounge Status: ', payload);
    });
  }
  public startQuiz(){
    this.stompService.stompClient.send('/socket/room-status/' + this.codeGame, {}, JSON.stringify('S'));
    this.nextQuestion();
    // this.salaJuego.estadoSala = 'S';
  }
  public nextQuestion(){
    this.stompService.stompClient.send('/socket/manage-questions/' + this.codeGame, {});
  }
  private subscribeToJoinPlayer(){
    this.stompService.subscribe('/list-players/'+this.codeGame,(payload: any)=>{
      console.log('PlayerLogin: ', JSON.parse(payload.body));
      if(this.quiz){
        this.quiz.jugadores=(JSON.parse(payload.body) as IQuizResponse).jugadores;
      }else{
        this.quiz=JSON.parse(payload.body);
        console.log("quiz",this.quiz)
        this.formName=this.quiz.tituloCuestionario;
        this.isLoading=false;
        this.verifyCredentials();
      }
      this.loadParticipants();
    });
  }
  private singUpLounge(){
    this.stompService.stompClient.send(
      '/socket/join/'+this.codeGame,
      {},
      this.userid
    );
  }
}
