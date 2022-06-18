import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnChanges {

  public time:number;
  public timeLeft:number;
  public progress:number;
  public progressBar: HTMLElement;
  constructor() { 
    
    const actualDate= Date.now();
    this.time=10;
    this.timeLeft=this.time;
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.progressBar=document.getElementById('progressBar');
    this.startTimer();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnChanges(changes: SimpleChanges): void {
    // this.updateProgress();
  }
  public updateProgress(){
    this.progress = ((this.time-this.timeLeft)*100.0)/this.time;
    this.progressBar.style.width=this.progress.toString()+'%';
    console.log('porcentaje',this.progress);
    
    // console.log("tiempo restante",leftTime);
    // const progress= (leftTime*100)/this.time;
    // console.log("tiempo restante",progress);

  }
  public startTimer() {
    setInterval(() => {
      if(this.timeLeft >= 0) {
        console.log('time',this.timeLeft);
        this.updateProgress();
        this.timeLeft-=0.1;
      }else{
        this.timeLeft-=0.1;
      }
    },100);
  }
  public subscribeOnDate(){
  }

}
