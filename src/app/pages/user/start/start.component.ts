import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  quiz:any
  isSubmitted:any
  marksGot:any
  correctAnswers = 0
  attempted = 0
  timer:any

  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _quizService:QuizService,
    private router:Router
  ){

  }

  ngOnInit(){
    this.preventBackButton()
    this.qid=this._route.snapshot.paramMap.get("qid")
    // console.log(this.qid)
    this._quizService.getQuiz(this.qid).subscribe({
      next:(data:any)=>{
        this.quiz=data
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.loadQuestions()
    this.startTimer()
  }

  preventBackButton(){
    history.pushState(null,location.href,null);
    this.locationSt.onPopState(()=>{
      history.pushState(null,location.href,null)
    })
  }

  onSelectionChange(questionIndex: number, optionIndex: number) {
    // Save the selected answer for the given question
    // this.answers[questionIndex] = optionIndex;
    this.questions[questionIndex].answer = this.questions[questionIndex].options[optionIndex]
  }

  loadQuestions(){
    this._question.getQuizQuestionsForTest(this.qid).subscribe(
      (data)=>{
        this.question=data;

        this.timer=this.question.length*2*60;

        console.log(this.question)
        console.log(this.question.length)
        for(var i=0;i<this.question.length;i++){
          this.questions[i]={
            "queId":this.question[i].queId,
            "content":this.question[i].content,
            "options":[this.question[i].option1,this.question[i].option2,this.question[i].option3,this.question[i].option4],
            "answer": null
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

    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'submit',
      icon: 'info',
    }).then((e) =>{
      if(e.isConfirmed){
        this.evalQuiz();
      }
    })
    // Submit the user's answers to the backend service
    console.log(this.answers)

    // console.log(this.question)
    // this._quizService.submitAnswers(this.answers,this.question).subscribe((data) => {
    //   this.router.navigate(['/userDash'])
    //   // Navigate to the results page
    //   // TODO: Implement navigation to the results page
    // });
  }


  startTimer(){
   let t= window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz()
        clearInterval(t)
      }
      else{
        this.timer--;
      }
    },1000)
  }

  getFormatedTime(){
    let mm=Math.floor(this.timer/60)
    let ss=this.timer-mm*60
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
    this.isSubmitted=true
    this._question.evalquiz(this.questions).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.attempted=data.attempted;
        this.correctAnswers=data.correctAnswer
        this.marksGot = this.correctAnswers * (this.quiz.maxMarks/this.questions.length)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    // const len = this.questions.length
    //     for(var u=0;u<len;u++){
    //       if(this.questions[u].answer!=null){
    //         this.attempted++;
    //       }
    //       if(this.question[u].answer==this.questions[u].answer){
    //         this.correctAnswers++;
    //         this.marksGot += this.question[u].quiz.maxMarks/this.questions.length
    //       }
    //     }
    //     console.log(this.marksGot+" "+this.attempted+" "+this.correctAnswers);
  }

  printPage(){
    window.print()
  }
}
