import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizQuestionsComponent } from './update-quiz-questions.component';

describe('UpdateQuizQuestionsComponent', () => {
  let component: UpdateQuizQuestionsComponent;
  let fixture: ComponentFixture<UpdateQuizQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuizQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
