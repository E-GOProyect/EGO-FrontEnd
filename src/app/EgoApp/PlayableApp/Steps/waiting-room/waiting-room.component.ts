import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {
  public participantList: Array<string>;
  public formName: string;
  constructor() { 
    this.participantList=[]
    this.formName="FormName";
  }

  public mockParticipants(){
    this.participantList.push("Daniel");
    this.participantList.push("Arturo");
    this.participantList.push("Reushe");
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.mockParticipants();
  }

}
