import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { nav } from './Common/constants';
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
  ){
    // codigo de prueba HZXETM
    this.router.navigate(nav(RouterNavigate.MASTER_ROOM),{queryParams: {codigo: 'HZXETM'}});
    sessionStorage.clear();
    localStorage.clear();
  }
}
