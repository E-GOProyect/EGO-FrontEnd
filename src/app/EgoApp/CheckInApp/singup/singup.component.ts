import { IUserCredentials } from 'src/app/Common/interfaces';
import { IUserRegister } from '../../../Common/interfaces/user-register.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodeType, RouterNavigate } from 'src/app/Common/enums';
import { nav } from 'src/app/Common/constants';
import { UserService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';
import { Alert } from 'src/app/Common/Class/alert.class';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
  providers:[Alert]
})
export class SingupComponent implements OnInit {
  public form: FormGroup;
  /**
   * TODO: generar las alertas de error dependiendo el error al registrar el usuario
   * @param router
   * @param registerUsersService
   * @param cookieService
   */
  constructor(
    private router: Router,
    private registerUsersService: UserService,
    private alert: Alert
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.form = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
    });
    console.log(this.form.valid);
  }
  
  public async onSubmitForm() {
    if (this.form.valid) {
      const userRegister = this.form.value as IUserRegister;
      try {
        const res = await this.registerUsersService.registerUser(userRegister);
        console.log("onSubmitForm ~ res", res);

        // ? Descomentar solo para probar las credenciales 
        if (res.responseStatus['codigoRespuesta'] === CodeType.SUCCESS) {
          // TODO: mejorar esto, las password no se deben almacenar indefinidamente en cookies
          this.alert.alertSuccess(
            'Genial',
            'Tu usuario ha sido creado con exito',
            ()=>{
              const credentials={
                username: this.form.value.username,
                password: this.form.value.password
              }as IUserCredentials;
              sessionStorage.setItem('credentials',JSON.stringify(credentials))
              this.router.navigate(nav(RouterNavigate.LOGIN));
            }
          );
          
        }else{
          this.alert.alertError(
            'Error!',
            res.responseStatus['codigoRespuesta'],
          );
        }
      } catch (e) {

      }
    }
  }
  public onGoLogin() {
    console.log('Redired');
    this.router.navigate(nav(RouterNavigate.LOGIN));
  }
}
