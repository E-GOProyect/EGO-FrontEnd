import { Component, Input, OnInit } from '@angular/core';
import { IScorePlayerResponse } from 'src/app/Common/interfaces';

@Component({
  selector: 'app-question-await',
  templateUrl: './question-await.component.html',
  styleUrls: ['./question-await.component.scss']
})
export class QuestionAwaitComponent implements OnInit {
  @Input() ScorePlayer:Array<IScorePlayerResponse>;

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

}
