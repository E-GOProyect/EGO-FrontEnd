import { ServiceService } from '../../../Service/service.service'
import { Component, OnInit } from '@angular/core'
import { Credentials } from 'src/app/Common/interfaces'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome'
import {
  faDoorOpen,
  faRightToBracket,
  faSquare,
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  // public temp: Credentials;
  // constructor (private service:ServiceService) {
  //   this.temp={
  //     username: 'egofirst',
  //     password: '123456789',
  //   }as Credentials;
  // }

  public constructor(library: FaIconLibrary) {
    library.addIcons(faSquare, faDoorOpen, faRightToBracket)
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // this.service.login({ username: "egofirst", password: "123456789"})
    // .subscribe(data=>{
    //   alert("exito");
    //   //console.log("LA REAL DATA",data);
    // });
  }
}
