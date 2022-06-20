import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { Subject } from 'rxjs';
import { Alert } from 'src/app/Common/Class/alert.class';
import { nav } from 'src/app/Common/constants';
import { ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { IAnswered } from 'src/app/Common/interfaces';
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
  public quizName: string;
  public countdownConfig:CountdownConfig;
  public questionName: string;
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
    private router:Router
  ) {
    this.unsubscribe$=new Subject();

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
    this.userid = sessionStorage.getItem(ParamStorage.userId);
    if(!this.userid){
      this.alert.alertError('Oh No!', 'Hubo un error en las credenciales, regresando a checkIn',()=>{
        this.onReturnCheckIn()
      });
    }
    this.subscribeToQuestion();
  }
  public onReturnCheckIn(){
    this.router.navigate(nav(RouterNavigate.CHECK_IN));
  }
  public reloadQuestion(){
    this.quizQuestion=JSON.parse(localStorage.getItem(ParamStorage.currectQuestion));
    if(this.quizQuestion){

    }
  }
  private subscribeToQuestion(){
    this.stompService.subscribe('/question/'+this.codeGame,(payload: any)=>{
      console.log('ActualQuestion: ',JSON.parse(payload.body));
      localStorage.setItem(ParamStorage.currectQuestion,payload.body);
    },this.unsubscribe$);
  }
  public onChooseAnswered(idOpcion:number){
    console.log('respuesta: ',idOpcion);
    this.chosenOption=idOpcion;
    this.sendAnswered();
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
  public sendAnswered(){
    const uuId= sessionStorage.getItem(ParamStorage.userId);
    if(!uuId){
      // TODO: agregar Alert
      return null;
    }
    if(this.codeGame){
      // TODO: agregar Alert
      return null;
    }

    const answered= {
      idJugador: uuId,
      idOpcion: this.chosenOption,
      tiempoDemoradoMS: 4, // TODO: campo por cambiar
    }as IAnswered;
    this.cuestionarioService.sendAnswered(answered,this.codeGame);
  }

}
