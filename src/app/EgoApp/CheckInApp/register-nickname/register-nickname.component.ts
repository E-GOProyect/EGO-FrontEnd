import { ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { nav } from 'src/app/Common/constants';
import { Alert } from 'src/app/Common/Class/alert.class';

@Component({
  selector: 'app-register-nickname',
  templateUrl: './register-nickname.component.html',
  styleUrls: ['./register-nickname.component.scss'],
  providers: [Alert]
})
export class RegisterNicknameComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private userService:UserService,
    private alert:Alert

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
  public async onSubmitUserName(){
    if(this.form.valid){
      const username= this.form.value.username;
      const res= await this.userService.registerGuest(username);
      console.log('response',res);
      if(res.responseStatus['codigoRespuesta'] === '0'){
        sessionStorage.setItem(ParamStorage.userId,res.responseData['id']);
        const codeGame= sessionStorage.getItem(ParamStorage.gameCode);
        if(codeGame){
          this.router.navigate(nav(RouterNavigate.WAITING_ROOM),{queryParams: {codigo: codeGame}});
        }else{
          this.alert.alertError('Oh no!!', 'No se encontró un codigo de juego');
        }

      }else{
        this.alert.alertError('Oh no!!', res.responseData.toString());
      }
    }
    console.log("onSubmitUserName ~ this.form.value", this.form.value);
  }
  public onBackCheckIn(){
    this.router.navigate(nav(RouterNavigate.CHECK_IN));
  }
}
