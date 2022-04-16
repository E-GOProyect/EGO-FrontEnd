import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAwaitComponent } from './question-await.component';

describe('QuestionAwaitComponent', () => {
  let component: QuestionAwaitComponent;
  let fixture: ComponentFixture<QuestionAwaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAwaitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAwaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
