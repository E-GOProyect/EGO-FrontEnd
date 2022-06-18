import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-master-room',
  templateUrl: './master-room.component.html',
  styleUrls: ['./master-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterRoomComponent implements OnInit,OnChanges, OnDestroy {
  public startTime: Subject<boolean>;
  public resetTime: Subject<boolean>;
  constructor() { 
    this.startTime=new Subject();
    this.resetTime=new Subject();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.startTime.next(false);

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  public comenzarPregunta(){
    this.startTime.next(true);
  }

  public onResetTime(){
    this.resetTime.next(true);
  }

}
