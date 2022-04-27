import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RegisterNicknameComponent } from './register-nickname.component'

describe('RegisterNicknameComponent', () => {
  let component: RegisterNicknameComponent
  let fixture: ComponentFixture<RegisterNicknameComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterNicknameComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNicknameComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
