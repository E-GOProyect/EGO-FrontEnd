import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faDoorOpen, faRightToBracket, faSquare } from '@fortawesome/free-solid-svg-icons';
import { nav } from 'src/app/Common/constants';
import { RouterNavigate } from 'src/app/Common/enums';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  public form: FormGroup;
  
  public constructor(
    public library:FaIconLibrary,
    private router: Router,
    ) { 
    library.addIcons(
      faSquare,
      faDoorOpen,
      faRightToBracket
    );
  }
  public onSingUp(){
    this.router.navigate(nav(RouterNavigate.SIGN_UP));
  }
  public onLogin(){
    this.router.navigate(nav(RouterNavigate.LOGIN));
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    //
  }

}
