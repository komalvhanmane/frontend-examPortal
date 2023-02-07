import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizQuestionsComponent } from './add-quiz-questions.component';

describe('AddQuizQuestionsComponent', () => {
  let component: AddQuizQuestionsComponent;
  let fixture: ComponentFixture<AddQuizQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuizQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
