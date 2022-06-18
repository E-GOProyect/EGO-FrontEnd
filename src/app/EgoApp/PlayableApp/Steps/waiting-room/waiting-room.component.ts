import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/Common/Class/alert.class';
import { ParamStorage } from 'src/app/Common/enums';
import { IQuizResponse } from 'src/app/Common/interfaces/quiz-response.interface';
import { StompService } from 'src/app/Service/stomp.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
  providers:[Alert]
})
export class WaitingRoomComponent implements OnInit {

  public participantList: Array<string>;
  public isLoading:boolean;
  public formName: string;

  private codeGame: string;

  protected quiz: IQuizResponse;
  protected userid: string;

  constructor(
    public stompService:StompService,
    private activatedRoute:ActivatedRoute,
    private alert: Alert,
  ) {
    this.participantList = [];
    this.formName = 'FormName';
    this.isLoading=true;
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
  public mockParticipants() {
    this.participantList.push('Daniel');
    this.participantList.push('Arturo');
    this.participantList.push('Reushe');
  }
 
  private loadParticipants(){
    this.participantList.splice(0);
    this.participantList= this.quiz.jugadores.map((player)=>{
      return player.username;
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.getUserId();
    this.mockParticipants();
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
    this.stompService.isConnected$.subscribe((res)=>{
      console.log('Is conected', res);
      this.singUpLounge();
    });
  }

  private subscribeToJoinPlayer(){
    this.stompService.subscribe('/join-player/'+this.codeGame,(payload: any)=>{
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
    });
  }
  private subscribeToLoungeStatus(){
    this.stompService.subscribe('/room-status/'+this.codeGame,(payload: any)=>{
      console.log('Lounge Status: ', payload);
    });
  }
  private subscribeToChat(){
    this.stompService.subscribe('/chat/'+this.codeGame,(payload: any)=>{
      console.log('ChatConnected: ', payload);
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
