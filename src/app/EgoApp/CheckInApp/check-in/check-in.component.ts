import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faDoorOpen,
  faRightToBracket,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import { nav } from 'src/app/Common/constants';
import { RouterNavigate } from 'src/app/Common/enums';
import { CuestionarioService } from 'src/app/Service/cuestionario.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  public form: FormGroup;

  public constructor(
    public library: FaIconLibrary,
    private router: Router,
    private cuestionarioService: CuestionarioService
  ) {
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
  public async onSubmitId() {
    console.log(this.form.value);
    if (this.form.valid) {
      try {
        const res = await this.cuestionarioService.validateLounge(
          this.form.value.codeId
        );
        console.log('Respuestas:', res);
      } catch (e) {
        console.log(e);
      }
    }
    // this.router.navigate(nav(RouterNavigate.GUEST_USERNAME));
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    //
    this.initForm();
  }
}
