import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterNavigate } from './Common/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ego-app';
  constructor(
    private router:Router
  ){}
  prueba(){
    this.router.navigate([RouterNavigate.PLAYABLE_APP,RouterNavigate.RESULT]);
  }
}
