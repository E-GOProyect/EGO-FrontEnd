import { RouterNavigate } from 'src/app/Common/enums';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { nav } from 'src/app/Common/constants';

@Component({
  selector: 'app-register-nickname',
  templateUrl: './register-nickname.component.html',
  styleUrls: ['./register-nickname.component.scss']
})
export class RegisterNicknameComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private userService:UserService,
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.createForm(); 
  }
  public createForm() {
    this.form = new FormGroup({
      username: new FormControl('',Validators.required),
    });
    console.log(this.form.valid);
  }
  public onSubmitUserName(){
    if(this.form.valid){
      const username= this.form.value.username;
      const res=this.userService.registerGuest(username);
      console.log(res);
    }
    console.log("onSubmitUserName ~ this.form.value", this.form.value);
  }
  public onBackCheckIn(){
    this.router.navigate(nav(RouterNavigate.CHECK_IN));
  }
}
