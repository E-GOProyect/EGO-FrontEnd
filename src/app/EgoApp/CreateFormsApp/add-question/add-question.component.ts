import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.initParameters();
  }

  public initParameters() {
    this.createForm();
    this.cardRes = new Array<IRespuestaCard>();
    this.numRes = 0;
    this.cardRes = CARD_RES_INIT();
    this.actualizarNumRes();
  }
  public createForm() {
    this.form = new FormGroup({
      question: new FormControl('',Validators.minLength(5)),
      answer1: new FormControl('',Validators.minLength(5)),
      answer2: new FormControl('',Validators.minLength(5)),
      answer3: new FormControl('',Validators.minLength(5)),
      answer4: new FormControl('',Validators.minLength(5)),
      points: new FormControl('',Validators.pattern('[0-9]*')),
    });
  }
  public addCardRes() {
    console.log('form', this.form.valid);

    if (this.numRes < 4) {
      this.cardRes.push({
        resNum: this.numRes + 1,
        isCorrect: false,
        answerName: 'answer' + (this.numRes + 1).toString(),
      });
    }
    this.actualizarNumRes();
  }
  public delCardRes() {
    if (this.cardRes.length > 2) {
      this.cardRes.pop();
    }
    this.actualizarNumRes();
  }
  public actualizarNumRes() {
    this.numRes = this.cardRes.length;
  }
}
