import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-master-room',
  templateUrl: './master-room.component.html',
  styleUrls: ['./master-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterRoomComponent implements OnInit,OnChanges {
  
  constructor() { 
    
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
