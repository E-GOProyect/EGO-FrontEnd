import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

  concursantes:Array<any> = [
    {pregunta:'pregunta1', respuestaCorrecta:'v', respuestaIncorrecta:'f'},
    {pregunta:'pregunta2', respuestaCorrecta:'v', respuestaIncorrecta:'f'},
    {pregunta:'pregunta3', respuestaCorrecta:'v', respuestaIncorrecta:'f'}
  ]




}
