import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  providers: [],
})
export class AddQuestionComponent implements OnInit {
  public form: FormGroup;
  public quizName: string;
  public quiz: IQuiz;
  public currectQuestion: number;
  constructor(private cuestionarioService: CuestionarioService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.initParameters();

    // sessionStorage.setItem('quiz',JSON.stringify(tempQuiz));
    // const temp=this.cuestionarioService.createQuiz(this.quiz);
    // console.log("ngOnInit ~ temp", temp);
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
      this.quiz = {
        nombreCuestionario: this.quizName,
        usuario: uuiUser,
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
    console.log('createForm ~ values', values);
    this.form = new FormGroup({
      question: new FormControl(
        values.descripcionPregunta,
        Validators.minLength(5)
      ),
    });
    // TODO: establecer los validadores
    values.opciones.map((opc) => {
      this.form.addControl(opc.controlName, new FormControl(opc.descripcion));
      if (opc.esRespuesta) {
        this.form.addControl('points', new FormControl(opc.valorDePuntaje));
      }
    });
  }
  public getQuestion(pageNumber: number) {
    let question: IPregunta;
    this.quiz.preguntas.map((val) => {
      if (val.page == pageNumber) {
        question = val;
      }
    });
    return question;
  }

  public onNewQuestion() {
    const isSave = this.saveNewQuestion();
    if (isSave) {
      this.resetAll();
    }
  }
  public saveNewQuestion() {
    if (!this.form.valid) {
      console.log('saveNewQuestion ~ this.form.valid', this.form.valid);
      // TODO: agregar mensaje indicando los errores en la pregunta
      return false;
    }
    const values = this.form.value;
    console.log('saveNewQuestion ~ values', values);

    let respuestas = [];
    Object.keys(values).map((key) => {
      if (key.includes('answer')) {
        respuestas.push(values[key]);
      }
    });
    console.log('respuestas ~ respuestas', respuestas);
    const opciones = respuestas.map((opc, index) => {
      const points = index === 0 ? values.points : 0;
      const isCorrectOpc = index === 0 ? true : false;
      return {
        descripcion: opc,
        esRespuesta: isCorrectOpc,
        valorDePuntaje: points,
      };
    });
    console.log("opciones ~ opciones", opciones);
    this.quiz.preguntas=this.quiz.preguntas.map((ques)=>{
      if(ques.page===this.currectQuestion){
        return ques={
          descripcionPregunta: this.form.value.question,
          opciones: opciones,
          page: this.quiz.preguntas.length + 1,
        } as IPregunta;
      }
      return ques;
    });
    this.currectQuestion++;
    this.quiz.preguntas.push(defaultQuestion('answer', this.currectQuestion));
    this.displayCurrentCuestion();
    console.log('saveNewQuestion ~ this.quiz', this.quiz);
    console.log("resetAll ~ this.form", this.form.value);

    return true;
  }
  public onSubmitQuiz() {
    this.saveNewQuestion();
  }

  public resetAll() {
    this.form = new FormGroup({});
  }
  public onNavBar(showQuestion: number) {
    this.currectQuestion = showQuestion;
    this.displayCurrentCuestion();
  }
  // TODO: tomar el currectQuestiony mostrarlo en display
  public displayCurrentCuestion() {
    this.resetAll();
    this.createForm();
  }
  public addAnswer() {
    this.quiz.preguntas.forEach((ques) => {
      if (ques.page === this.currectQuestion) {
        const numAnswer=(ques.opciones.length+1).toString();
        this.form.addControl(
          'answer' +numAnswer,
          new FormControl('')
        );
        ques.opciones.push(
          defaultOpcion(false, 'answer' + numAnswer)
        );
      }
    });
  }
  public delAnswer() {
    this.quiz.preguntas.forEach((ques) => {
      if (ques.page === this.currectQuestion) {
        const numAnswer=ques.opciones.length;
        if (numAnswer){
          this.form.removeControl('answer' +numAnswer );
          ques.opciones.pop();
        }
      }
    });
  }
}
