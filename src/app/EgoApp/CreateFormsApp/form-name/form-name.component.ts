import { RouterNavigate } from 'src/app/Common/enums';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nav } from 'src/app/Common/constants';

@Component({
  selector: 'app-form-name',
  templateUrl: './form-name.component.html',
  styleUrls: ['./form-name.component.scss'],
})
/**
 * TODO: implementar la funcion cancelar
 */
export class FormNameComponent implements OnInit {
  public form: FormGroup;

  constructor(private router: Router) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.form = new FormGroup({
      quizName: new FormControl('', Validators.required),
    });
    console.log(this.form.valid);
  }
  public onSubmitQuizName() {
    console.log('createForm ~ this.form', this.form.value);
    if (this.form.valid) {
      sessionStorage.setItem('quizname',this.form.value.quizName);
      this.router.navigate(nav(RouterNavigate.ADD_QUESTION));
    }
  }
  public onCancel() {
    //
  }
}
