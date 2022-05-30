import { Credentials } from 'src/app/Common/interfaces';
import { IUser } from './../../../Common/interfaces/User.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodeType, RouterNavigate } from 'src/app/Common/enums';
import { nav } from 'src/app/Common/constants';
import { RegisterUserService } from 'src/app/Service/register-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
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
    private registerUsersService: RegisterUserService,
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
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
      const userRegister = this.form.value as IUser;
      try {
        const res = await this.registerUsersService.registerUser(userRegister);

        // ? Descomentar solo para probar las credenciales 
        // const credentials={
        //   username: this.form.value.username,
        //   password: this.form.value.password
        // }as Credentials;
        // sessionStorage.setItem('credentials',JSON.stringify(credentials))
        // this.router.navigate(nav(RouterNavigate.LOGIN));
        
        if (res.responseStatus.codigoRespuesta === CodeType.SUCCESS) {
          // TODO: mejorar esto, las password no se deben almacenar indefinidamente en cookies
          Swal.fire({
            title: 'Genial!',
            text: 'Tu usuario ha sido creado con exito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            const credentials={
              username: this.form.value.username,
              password: this.form.value.password
            }as Credentials;
            sessionStorage.setItem('credentials',JSON.stringify(credentials))
            this.router.navigate(nav(RouterNavigate.LOGIN));
          });
        }
      } catch (e) {}
    }
  }
  public onGoLogin() {
    console.log('Redired');
    this.router.navigate(nav(RouterNavigate.LOGIN));
  }
}
