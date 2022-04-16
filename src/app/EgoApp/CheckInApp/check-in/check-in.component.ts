import { ServiceService } from '../../../Service/service.service';
import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/Common/interfaces';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  public temp: Credentials;
  constructor (private service:ServiceService) { 
    this.temp={
      username: 'egofirst',
      password: '123456789',
    }as Credentials;
  }

  ngOnInit(): void {
    this.service.login({ username: "egofirst", password: "123456789"})
    .subscribe(data=>{
      alert("exito");
      //console.log("LA REAL DATA",data);
    });
  }

}
