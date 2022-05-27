import { Component, OnInit } from '@angular/core';
import { CARD_RES_INIT } from './constants/card-res.cosntants';
import { IRespuestaCard } from './interfaces/respuesta-card.interface';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  public cardRes: Array<IRespuestaCard>;
  public numRes: number;
  constructor() {
    this.cardRes = new Array<IRespuestaCard>();
    this.numRes = 0;
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.initParameters();
  }

  public initParameters() {
    this.cardRes = CARD_RES_INIT();
    this.actualizarNumRes();
  }
  public addCardRes() {
    if (this.numRes < 4) {
      this.cardRes.push({
        resNum: this.numRes + 1,
        isCorrect: false,
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
