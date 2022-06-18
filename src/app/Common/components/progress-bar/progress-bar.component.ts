import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { timer, Subject } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  @Input() public isLoading:Subject<boolean>;
  @Input() public startTime: Subject<boolean>;
  @Input() public resetTime: Subject<boolean>;
  @Input() public time:number = 10;
  @Output() public isFinish: Subject<boolean>;
  @Output() public timeLeft: Subject<number>;
  public tl:number;
  private interval;
  public progress:number;
  public contador: HTMLElement;
  public spinner: HTMLElement;
  private iterationCount:number;
  constructor() { 
    this.isFinish= new Subject();
    // this.isLoading= new Subject();
    this.timeLeft= new Subject();
    this.startTime= new Subject();
    // this.reset= new Subject();
    this.tl=this.time;
    this.iterationCount=1;
  }
  ngOnDestroy(): void {
    this.isLoading.unsubscribe();
  }

  ngOnInit(): void {
    this.contador=document.getElementById('count');
    this.spinner=document.getElementById('spinner');
    this.spinner.style.animationPlayState='pause';
    // this.initProgressBar();
    this.startTimer();
    this.subscribeToIsLoading();
    this.subscribeToReset();
  }

  public startTimer() {
    this.interval=setInterval(() => {
      if(this.tl >= 0) {
        this.spinner.style.animationPlayState='running';
        this.tl=parseFloat(this.tl.toFixed(1));
        // this.timeLeft.next(this.tl);
        console.log(this.tl);
        this.contador.textContent=this.tl.toString();
        this.tl-=1;
      }else{
        this.spinner.style.animationPlayState='paused';
        clearInterval(this.interval);
      }
    },1000);
  }
  public subscribeToIsLoading(){
    this.isLoading.subscribe((val)=>{
      if(val){
        // this.startTimer();
        // this.loadProgress();
        console.log("time start");
      }
    });
  }
  public subscribeToReset(){
    this.resetTime.subscribe((val)=>{
      console.log("reset time");
      if(val){
        // this.resetProgressBar();
      }
    });
  }

}
