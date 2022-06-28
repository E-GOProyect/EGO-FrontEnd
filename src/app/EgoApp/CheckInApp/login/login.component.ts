import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { nav } from 'src/app/Common/constants';
import { CodeType, ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { IUserCredentials } from 'src/app/Common/interfaces';
import { IUserData } from 'src/app/Common/interfaces/user-data.interface';
import { UserService } from 'src/app/Service/user.service';
import { Subject } from 'rxjs';
import { Alert } from 'src/app/Common/Class/alert.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[Alert]
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  protected credentials: IUserCredentials;
  public isLoading: boolean;

  constructor(
    private registerUsersService: UserService,
    private router: Router,
    private alert:Alert
  ) {
    this.isLoading=false;
    this.credentials = {
      username: '',
      password: '',
    }
    console.log("Loading",this.isLoading);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.createForm();
    this.initParamenters();
    // this.isLoading=true;

  }
  public createForm() {
    this.form = new FormGroup({
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      stayLogged: new FormControl(''),
    });
    console.log(this.form.valid);
  }
  public onLogIn() {
    if (this.form?.valid) {
      this.credentials={
        username: this.form.value.user,
        password: this.form.value.pass
      } as IUserCredentials; 
      console.log('onLogIn ~ this.credentials', this.form.value);
      this.loginUser();
    }else{
      console.log("No existen credenciales -> ", this.form.value);
    }
  }
  private initParamenters() {
    // ? Verifica las credenciales se encuentran en las cookies y realizar un bipass del loggin
    //this.mockCredentials();
    const credentialsInCache = sessionStorage.getItem('credentials');
    console.log('initParamenters ~ credentialsInCache', credentialsInCache);
    this.credentials = JSON.parse(credentialsInCache) as IUserCredentials;
    if (this.credentials?.username && this.credentials?.password) {
      console.log('initParamenters ~ this.credentials', this.credentials);
      this.loginUser();
    }else{
      sessionStorage.clear();
    }
  }

  private async loginUser() {
    try {
      this.isLoading=true;
      const res = await this.registerUsersService.loginUser(this.credentials);
      console.log(res);
      if (res.responseStatus['codigoRespuesta'] === CodeType.SUCCESS) {
        const data = res.responseData as IUserData;
        if(this.form.value.stayLogged){
          localStorage.setItem(ParamStorage.userData, JSON.stringify(data));
          localStorage.setItem(ParamStorage.userId, data.idUsuario);
        }
        sessionStorage.setItem(ParamStorage.userData, JSON.stringify(data));
        sessionStorage.setItem(ParamStorage.userId, data.idUsuario);
        const temp = JSON.parse(
          sessionStorage.getItem('userdata'),
          (key, val) => {
            if (key.includes('fecha')) {
              return new Date(val);
            }
            return val;
          }
        ) as IUserData;
        console.log('loginUser ~ data', temp);
        this.router.navigate(nav(RouterNavigate.CHECK_IN));
      }else{
        this.alert.alertError('Oh no...!',res.responseStatus['mensajeRespuesta']);
      }

    } catch (e) {
      console.log(e);
    }finally{
      this.isLoading=false;
    }
  }
  public onBackToCheckIn(){
    this.router.navigate(nav(RouterNavigate.CHECK_IN));
  }
  private mockCredentials() {
    // ? Cambiar las credenciales si se desea probar otra cuenta
    sessionStorage.setItem(
      'credentials',
      JSON.stringify({
        username: 'koinu1203',
        password: '1234567890',
      })
    );
  }
}
