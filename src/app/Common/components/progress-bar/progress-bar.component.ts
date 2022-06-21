import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { timer, Subject } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() public start: Subject<boolean>;
  @Input() public reset: Subject<boolean>;
  @Input() public time:number;
  @Output() public isFinish: Subject<boolean>;
  @Output() public timeLeft: Subject<number>;
  public tl:number;
  private interval;
  public spinner: HTMLElement;
  public count: HTMLElement;
  constructor() { 
    this.isFinish= new Subject();
    this.time=20;
    this.timeLeft= new Subject();
    this.start= new Subject();
    // this.reset= new Subject();
    this.tl=this.time;
  }
  

  ngOnInit(): void {
    this.subscribeToStartTime();
    this.subscribeToReset();
    this.spinner=document.getElementById('spinner');
    this.count=document.getElementById('count');
    this.spinner.style.animationPlayState='pause';
    this.count.style.animationPlayState='pause';
    this.startTimer();
  }

  public startTimer() {
    this.interval=setInterval(() => {
      if(this.tl > 0) {
        this.spinner.style.animationPlayState='running';
        this.count.style.animationPlayState='running';
        this.tl=parseFloat(this.tl.toFixed(1));
        this.timeLeft.next(this.tl);
        // console.log(this.tl);
        this.tl-=1;
        // this.contador.textContent=this.tl.toString();
      }else{
        this.isFinish.next(true);
        this.spinner.style.animationPlayState='paused';
        this.count.style.animationPlayState='paused';
        clearInterval(this.interval);
      }
    },1000);
  }
  public subscribeToStartTime(){
    this.start.subscribe((val)=>{
      if(val){
        this.startTimer();
        console.log("time start");
      }
    });
  }
  public subscribeToReset(){
    this.reset.subscribe((val)=>{
      console.log("reset time");
      if(val){
        this.tl=this.time;
        this.startTimer();

      }
    });
  }

}
