import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faDoorOpen,
  faRightToBracket,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'src/app/Common/Class/alert.class';
import { nav } from 'src/app/Common/constants';
import { CodeGameState, ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { IUserData } from 'src/app/Common/interfaces';
import { CuestionarioService } from 'src/app/Service/cuestionario.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
  providers:[Alert]
})
export class CheckInComponent implements OnInit {
  public form: FormGroup;
  public isLogin:boolean;
  public userData:IUserData;
  public constructor(
    public library: FaIconLibrary,
    private router: Router,
    private cuestionarioService: CuestionarioService,
    private alert:Alert
  ) {
    this.isLogin=false;
    library.addIcons(faSquare, faDoorOpen, faRightToBracket);
  }
  private initForm() {
    this.form = new FormGroup({
      codeId: new FormControl('', Validators.required),
    });
  }
  public onSingUp() {
    this.router.navigate(nav(RouterNavigate.SIGN_UP));
  }
  public onLogin() {
    this.router.navigate(nav(RouterNavigate.LOGIN));
  }
  public onCreateQuiz(){
    this.router.navigate(nav(RouterNavigate.FORM_NAME));
  }
  public onInitQuiz(){
    this.router.navigate(nav(RouterNavigate.REVIEW_FORM));
  }
  public async onSubmitId() {
    console.log(this.form.value);
    if (this.form.valid) {
      try {
        const code=this.form.value.codeId;
        const res = await this.cuestionarioService.validateLounge(
          code
        );
        console.log('Respuestas:', res);
        if(res){
          if(res.responseData.estado===CodeGameState.SUCCESS || res.responseData.estado===CodeGameState.ACTIVE){
            sessionStorage.setItem(ParamStorage.gameCode,code);
            if(this.isLogin){
              this.router.navigate(nav(RouterNavigate.WAITING_ROOM),{queryParams: {codigo: code}});
            }else{
              this.router.navigate(nav(RouterNavigate.GUEST_USERNAME));
            }
            //TODO: Guardar datos relevantes en session storage 

          }else{
            this.alert.alertError('Hubo un error','Estado del codigo ingresado: '+res.responseData.estado);

          }
        }
      } catch (error) {
        this.alert.alertError('Error-400',error.message);
        console.log("Error",error);
      }
    }
  }
  private checkLogin(){
    this.userData= JSON.parse(sessionStorage.getItem(ParamStorage.userData));
    if(this.userData){
      this.isLogin=true;
      console.log('esta logeado!!')
    }
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    //
    this.initForm();
    this.checkLogin();
  }
}
