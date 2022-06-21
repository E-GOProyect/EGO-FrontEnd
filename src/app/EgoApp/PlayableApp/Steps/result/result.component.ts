import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { nav } from 'src/app/Common/constants';
import { ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { IScorePlayerResponse } from 'src/app/Common/interfaces';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() ScorePlayer:Array<IScorePlayerResponse>;
  constructor(
    private router:Router
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    const scorePlayerInStorage= sessionStorage.getItem(ParamStorage.scoreTable);
    this.ScorePlayer=JSON.parse(scorePlayerInStorage);
  }

  public onGoToCheckIn(){
    this.router.navigate(nav(RouterNavigate.CHECK_IN));
  }
  
}
