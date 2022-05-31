import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CodeType } from 'src/app/Common/enums';
import { IUserCredentials } from 'src/app/Common/interfaces';
import { IUserData } from 'src/app/Common/interfaces/user-data.interface';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  protected credentials: IUserCredentials;
  
  constructor(
    private registerUsersService: UserService,
  ) { 
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit( ): void {
    this.initParamenters();
    
  }
  private initParamenters(){
    // ? Verifica las credenciales se encuentran en las cookies y realizar un bipass del loggin 
    this.mockCredentials();
    const credentialsInCache = sessionStorage.getItem('credentials');
    console.log("initParamenters ~ credentialsInCache", credentialsInCache);
    this.credentials=JSON.parse(credentialsInCache) as IUserCredentials;
    if(this.credentials.username && this.credentials.password){
      console.log("initParamenters ~ this.credentials", this.credentials);
      this.loginUser();
    }

  }

  private async loginUser(){
    try{
      const res= await this.registerUsersService.loginUser(this.credentials);
      console.log(res);
      if(res.responseStatus.codigoRespuesta===CodeType.SUCCESS){
        const data=res.responseData as IUserData;
        sessionStorage.setItem('userdata',JSON.stringify(data));
        sessionStorage.setItem('iduser',data.idUsuario);
        const temp=JSON.parse(sessionStorage.getItem('userData'),(key,val)=>{
          if(key.includes('fecha')){
            return new Date(val)
          }
          return val;
        }) as IUserData;
        console.log("loginUser ~ data", temp);

      }
    }catch (e){
      console.log(e);
    }
  }
  private mockCredentials(){
    // ? Cambiar las credenciales si se desea probar otra cuenta
    sessionStorage.setItem('credentials',JSON.stringify({
      username: 'koinu1203',
      password: '1234567890'
    }));
  }

}
