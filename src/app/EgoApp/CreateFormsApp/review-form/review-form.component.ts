import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/Common/Class/alert.class';
import { nav } from 'src/app/Common/constants';
import { CodeType, ParamStorage, RouterNavigate } from 'src/app/Common/enums';
import { CreateLounge } from 'src/app/Common/interfaces/crear-lounge.interface';
import { CuestionarioService } from 'src/app/Service/cuestionario.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
  providers:[ CuestionarioService,Alert ]
})
export class ReviewFormComponent implements OnInit {
  public quizList:any;
  protected uuid:string;
  private quizSelected:string;
  public isLoading:boolean;
  public form: FormGroup;
  constructor(
    private cuestionarioService:CuestionarioService,
    private alert:Alert,
    private router: Router,

  ) {
    this.isLoading=true;
   }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.initForm();
    this.listQuiz();
    this.uuid = sessionStorage.getItem(ParamStorage.userId);
    if(!this.uuid){
      this.alert.alertError(
        'Error en credenciales', 
        'Debes estar logeado para iniciar una sala',()=>{
        this.router.navigate(nav(RouterNavigate.CHECK_IN));
      })
    }
  }
  public initForm(){
    this.form=new FormGroup({
      // ValidatorFN.pattern('/[\d]{3}/')
      quizSelect: new FormControl('-1',Validators.minLength(3)),
    });
  }
  private async listQuiz(){
    const res = await this.cuestionarioService.getQuizs('hola');
    console.log("quizsList", res);
    if(!res){
      this.alert.alertError('A ocurrido un error', 'No se puede obtener cuestionarios validos, see... la culpa es de back',()=>{
        this.router.navigate(nav(RouterNavigate.CHECK_IN));
      })
    }
    this.quizList=res;
    this.quizSelected=this.quizList[0]?.idCuestionario;
    this.isLoading=false;
  }

  public onSelectQuiz(){
    // this.quizSelected=idQuiz;
    if(this.form.valid){
      this.quizSelected=this.form.value.quizSelect;
      this.onCreateLobby();
    }else{
      this.alert.alertError(
        'No se ha seleccionado una Quiz', 
        'Por favor, selecciona uno antes de continuar');
    }
    console.log('this quiz selected:', this.form);
    console.log('this quiz selected:', this.form.valid);
  }
  public async onCreateLobby(){
    try{
      const lounge={
        idCuestionario: this.quizSelected,
        idUsuario: this.uuid,
      } as CreateLounge;
      const res = await this.cuestionarioService.createLounge(lounge);
      console.log('response lounge: ',res);
      if(res && res.responseStatus.codigoRespuesta===CodeType.SUCCESS){
        const gameCode= res.responseData.codigo;
        sessionStorage.setItem(ParamStorage.gameCode,gameCode)
        this.router.navigate(nav(RouterNavigate.MASTER_ROOM),{queryParams: {codigo: gameCode}});
      }else{
        this.alert.alertError(
          'Oh no!', 
          res.responseStatus.mensajeRespuesta,
          ()=>{
          this.router.navigate(nav(RouterNavigate.CHECK_IN));
        })
      }
    }catch(e){
      this.alert.alertError(
        'Ocurrio un error inesperado', 
        'See... definitivamente la culpa es de back',()=>{
        this.router.navigate(nav(RouterNavigate.CHECK_IN));
      })
    }
  }
}
