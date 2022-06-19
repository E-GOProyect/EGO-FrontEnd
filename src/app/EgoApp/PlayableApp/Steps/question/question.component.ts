import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { ParamStorage } from 'src/app/Common/enums';
import { IAnswered } from 'src/app/Common/interfaces';
import { IQuestionResponse } from 'src/app/Common/interfaces/question-response.interface';
import { CuestionarioService } from 'src/app/Service/cuestionario.service';
import { StompService } from 'src/app/Service/stomp.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [StompService]
})
export class QuestionComponent implements OnInit {
  public quizName: string;
  public countdownConfig:CountdownConfig;
  public questionName: string;
  private codeGame: string;
  public quizQuestion: IQuestionResponse;
  private chosenOption: number;

  constructor(
    public stompService:StompService,
    public cuestionarioService: CuestionarioService,
    private activatedRoute: ActivatedRoute
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      res => this.codeGame = res['codigo']
    );
    this.subscribeToQuestion();
  }
  
  private subscribeToQuestion(){
    this.stompService.subscribe('/question/'+this.codeGame,(payload: any)=>{
      this.quizQuestion= JSON.parse(payload.body);
      console.log('ActualQuestion: ',this.quizQuestion);

    });
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
