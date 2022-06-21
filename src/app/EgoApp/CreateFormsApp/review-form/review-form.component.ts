import { Component, OnInit } from '@angular/core';
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
  private quizSelected:number;
  public isLoading:boolean;
  constructor(
    private cuestionarioService:CuestionarioService,
    private alert:Alert,
    private router: Router,

  ) {
    this.isLoading=true;
   }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
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
  public fun(id:any){
    console.log('dsadasd',id);
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

  public onSelectQuiz(idQuiz:number){
    this.quizSelected=idQuiz;
    console.log('this quiz selected:', this.quizSelected);
  }
  public async onCreateLobby(){
    try{
      const lounge={
        idCuestionario: this.quizSelected.toString(),
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
