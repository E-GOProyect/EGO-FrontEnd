import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPregunta, IQuiz, IShowQuestion } from 'src/app/Common/interfaces';
import { CuestionarioService } from 'src/app/Service/cuestionario.service';
import { CARD_RES_INIT } from './constants/card-res.cosntants';
import { IRespuestaCard } from './interfaces/respuesta-card.interface';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
  providers: [],
})
export class AddQuestionComponent implements OnInit {
  public cardRes: Array<IRespuestaCard>;
  public numRes: number;
  public form: FormGroup;
  public quizName: string;
  private quiz: IQuiz;
  public listShowQuestions: Array<IShowQuestion>;
  private currectQuestion: IShowQuestion;
  constructor(
    private cuestionarioService:CuestionarioService,
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.initParameters();
    // const temp=this.cuestionarioService.createQuiz();
    // console.log("ngOnInit ~ temp", temp);
  }

  public initParameters() {
    this.createForm();
    this.initQuizName();
    this.initQuiz();
    this.listShowQuestions=[];
    this.cardRes = new Array<IRespuestaCard>();
    this.numRes = 0;
    this.cardRes = CARD_RES_INIT();
    this.actualizarNumRes();
  }
  public initQuizName(){
    const quizNameInCache= sessionStorage.getItem('quizname');
    if(quizNameInCache){
      this.quizName=quizNameInCache;
    }else{
      this.quizName='Not found';
    }
  }
  public initQuiz(){
    const uuiUser=sessionStorage.getItem('iduser');
    this.quiz={
      nombreCuestionario:this.quizName,
      usuario:uuiUser,
      preguntas: []
    }
  }
  public createForm() {
    this.form = new FormGroup({
      question: new FormControl('',Validators.minLength(5)),
      answer1: new FormControl('',Validators.minLength(5)),
      answer2: new FormControl('',Validators.minLength(5)),
      points: new FormControl('',Validators.pattern('[0-9]*')),
    });
  }
  public addCardRes() {
    if (this.numRes < 4) {
      this.cardRes.push({
        resNum: this.numRes + 1,
        isCorrect: false,
        answerName: 'answer' + (this.numRes + 1).toString(),
        
      });
      this.form.addControl('answer' + (this.numRes + 1),new FormControl(''));

    }
    this.actualizarNumRes();
  }
  public delCardRes() {
    if (this.cardRes.length > 2) {
      this.form.removeControl('answer' + (this.numRes).toString());
      this.cardRes.pop();
    }
    this.actualizarNumRes();
  }
  public actualizarNumRes() {
    this.numRes = this.cardRes.length;
  }
  public onNewQuestion(){
    this.resetAll();
  }

  public resetAll(){
    this.cardRes = CARD_RES_INIT();
    this.createForm();
    this.actualizarNumRes();
  }
  public onNavBar(showQuestion:IShowQuestion){
    this.currectQuestion=showQuestion;
    
  }
}
