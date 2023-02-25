import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  qid:any;
  remainingTime: any;
  question:any;
  questions: any[]=[];
  answers: number[] = [];


  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _quizService:QuizService
  ){

  }

  ngOnInit(){
    this.preventBackButton()
    this.qid=this._route.snapshot.paramMap.get("qid")
    // console.log(this.qid)
    this.loadQuestions()
  }

  preventBackButton(){
    history.pushState(null,location.href,null);
    this.locationSt.onPopState(()=>{
      history.pushState(null,location.href,null)
    })
  }

  onSelectionChange(questionIndex: number, optionIndex: number) {
    // Save the selected answer for the given question
    this.answers[questionIndex] = optionIndex;
  }

  loadQuestions(){
    this._question.getQuizQuestionsForTest(this.qid).subscribe(
      (data)=>{
        this.question=data;
        console.log(this.question.length)
        for(var i=0;i<this.question.length;i++){
          this.questions[i]={
            "content":this.question[i].content,
            "options":[this.question[i].option1,this.question[i].option2,this.question[i].option3,this.question[i].option4]
          }
          console.log(this.questions[i])
        }
        this.answers = Array(this.questions.length).fill(-1);
        // console.log(this.questions)
      }
      ,
      (error)=>{
        Swal.fire("error","Server While Loading Questions","error")
      }
    )
  }

  submitAnswers() {
    // Submit the user's answers to the backend service
    console.log(this.answers)
    // this._quizService.submitAnswers(this.answers).subscribe(() => {
    //   // Navigate to the results page
    //   // TODO: Implement navigation to the results page
    // });
  }
}
