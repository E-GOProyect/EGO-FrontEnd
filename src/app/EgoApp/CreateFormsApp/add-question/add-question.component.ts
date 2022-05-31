import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/Common/Class/alert.class';
import {
  defaultOpcion,
  defaultQuestion,
} from 'src/app/Common/constants/default-question.constants';
import { IOpciones, IPregunta, IQuiz } from 'src/app/Common/interfaces';
import { CuestionarioService } from 'src/app/Service/cuestionario.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
  providers: [ Alert],
})
export class AddQuestionComponent implements OnInit {
  public form: FormGroup;
  public quizName: string;
  public quiz: IQuiz;
  public currectQuestion: number;
  constructor(
    private cuestionarioService: CuestionarioService,
    private alert: Alert,
    ) {}

  ngOnInit(): void {
    this.initParameters();
  }

  public initParameters() {
    this.initQuiz();
  }

  public initQuizName() {
    const quizNameInCache = sessionStorage.getItem('quizname');
    if (quizNameInCache) {
      this.quizName = quizNameInCache;
    } else {
      this.quizName = 'Not found';
    }
  }
  public initQuiz() {
    const quizInCache = JSON.parse(sessionStorage.getItem('quiz'));
    console.log('initQuiz ~ quizInCache', quizInCache);
    if (quizInCache) {
      this.parseQuiz(quizInCache);
    } else {
      this.initQuizName();
      this.currectQuestion = 1;
      const uuiUser = JSON.parse(sessionStorage.getItem('userid'));
      const mockUuiUser= '67dccb00-698e-4038-b37e-8762cc7ef739'
      this.quiz = {
        nombreCuestionario: this.quizName,
        usuario: uuiUser? uuiUser:mockUuiUser,
        preguntas: [defaultQuestion('answer')],
      } as IQuiz;
      this.createForm();
    }
  }

  public parseQuiz(obj: any) {
    let count = 0;
    const questions = Object.keys(obj.preguntas).map((val: any) => {
      const ques = obj.preguntas[val];
      const opcions = Object.keys(ques).map((k) => {
        return ques[k] as IOpciones;
      });
      count++;
      return {
        descripcionPregunta: val.descripcionPregunta,
        opciones: opcions,
        page: count,
      } as IPregunta;
    });
    this.quiz = {
      nombreCuestionario: obj.nombreCuestionario,
      usuario: obj.usuario,
      preguntas: questions,
    } as IQuiz;
  }
  public createForm() {
    const values = this.getQuestion(this.currectQuestion);
    this.form = new FormGroup({
      question: new FormControl(
        values.descripcionPregunta,
        Validators.minLength(5)
      ),
      // TODO: add validator de puntaje 
      points: new FormControl(
        values.valorPregunta
      ),
    });
    // TODO: establecer los validadores
    values.opciones.map((opc) => {

      this.form.addControl(opc.controlName, new FormControl(opc.descripcion));
    });
  }
  public getQuestion(pageNumber: number) {
    let question: IPregunta;
    this.quiz.preguntas.map((val) => {
      if (val.page === pageNumber) {
        question = val;
      }
    });
    return question;
  }

  public onNewQuestion() {
    const isSave = this.saveNewQuestion();
    if (isSave) {
      this.currectQuestion = this.quiz.preguntas.length + 1;
      console.log('onNewQuestion ~ this.currectQuestion', this.currectQuestion);
      this.quiz.preguntas.push(defaultQuestion('answer', this.currectQuestion));
      this.displayCurrentCuestion();
    }
  }
  public saveNewQuestion() {
    if (!this.form.valid) {
      console.log('saveNewQuestion ~ this.form.valid', this.form.valid);
      // TODO: agregar mensaje indicando los errores en la pregunta
      return false;
    }
    const values = this.form.value;

    const respuestas = this.getAnswerFromForm();
    const opciones = respuestas.map((opc, index) => {
      const isCorrectOpc = index === 0 ? true : false;
      return {
        descripcion: opc,
        esRespuesta: isCorrectOpc,
        controlName: 'answer' + (index + 1).toString(),
      };
    });
    this.quiz.preguntas = this.quiz.preguntas.map((ques) => {
      if (ques.page === this.currectQuestion) {
        return (ques = {
          descripcionPregunta: this.form.value.question,
          opciones: opciones,
          page: this.currectQuestion,
          valorPregunta: values.points,
        } as IPregunta);
      }
      return ques;
    });

    console.log('saveNewQuestion ~ this.quiz', this.quiz);

    return true;
  }
  public getAnswerFromForm() {
    const values = this.form.value;
    let respuestas = [];
    Object.keys(values).map((key) => {
      if (key.includes('answer')) {
        respuestas.push(values[key]);
      }
    });
    return respuestas;
  }
  public onSubmitQuiz() {
    this.saveNewQuestion();
    this.sendQuizToDB();
  }
  public async sendQuizToDB() {
    const res = await this.cuestionarioService.createQuiz(this.quiz);
    console.log("sendQuizToDB ~ res", res);
    if(res){
      if(res.responseStatus.codigoRespuesta==='0'){
        this.alert.alertSuccess(
          'Excelente',
          'Tu cuestionario a sido registrado :D',
        );
      }else{
        this.alert.alertError(
          'Oh no!',
          res.responseStatus.mensajeRespuesta,
        );
      }
    }
    
  }
  public resetAll() {
    this.form = new FormGroup({});
  }
  public onNavBar(showQuestion: number) {
    if (showQuestion => 1 && showQuestion <= 15 && showQuestion<=this.quiz.preguntas.length) {
      this.currectQuestion = showQuestion;
      console.log('onNavBar ~ currectQuestion', this.currectQuestion);
      this.displayCurrentCuestion();
    }
  }
  public displayCurrentCuestion() {
    this.resetAll();
    this.createForm();
  }
  public addAnswer() {
    this.quiz.preguntas.forEach((ques) => {
      if (ques.page === this.currectQuestion) {
        const numAnswer = (ques.opciones.length + 1).toString();
        this.form.addControl('answer' + numAnswer, new FormControl(''));
        ques.opciones.push(defaultOpcion(false, 'answer' + numAnswer));
      }
    });
  }
  public delAnswer() {
    this.quiz.preguntas.forEach((ques) => {
      if (ques.page === this.currectQuestion) {
        const numAnswer = ques.opciones.length;
        if (numAnswer) {
          this.form.removeControl('answer' + numAnswer);
          ques.opciones.pop();
        }
      }
    });
  }
}
