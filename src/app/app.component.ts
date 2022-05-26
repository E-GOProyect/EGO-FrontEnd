import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigateTo } from './Common/Class/navigate-to.class';
import { nav } from './Common/constants';
import { ParalelicRoutes, RouterNavigate } from './Common/enums';

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
    this.router.navigate(nav(RouterNavigate.ADD_QUESTION));
  }
}
