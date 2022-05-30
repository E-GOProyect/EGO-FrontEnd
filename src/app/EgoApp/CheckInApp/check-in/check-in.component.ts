import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faDoorOpen, faRightToBracket, faSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  
  public constructor(library:FaIconLibrary) { 
    library.addIcons(
      faSquare,
      faDoorOpen,
      faRightToBracket
    );
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    //
  }

}
