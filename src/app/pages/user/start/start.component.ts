import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmComponentDeactivate } from 'src/app/services/confirm-deactivate.guard';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements confirmComponentDeactivate {
  started = false;
  qid:any;
  remainingTime: any;
  question:any;
  questions: any[]=[];
  answers: string[] = [];
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
    private router:Router,
    public login:LoginService,
    private userse:UserService
  ){

  }


  results: any ;
  ngOnInit(){
    this.qid=this._route.snapshot.paramMap.get("qid")
    console.log(this.qid)
    this._quizService.getQuiz(this.qid).subscribe({
      next:(data:any)=>{
        this.quiz=data
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.results=[]
    // if(!this.checkIfAttempted()){
      this.startTest();
      window.addEventListener("keyup", disableF5);
      window.addEventListener("keydown", disableF5);

      function disableF5(e:any) {
        if ((e.which || e.keyCode) == 116) e.preventDefault();
      };

      this.preventBackButton()
      this.loadQuestions()
      this.startTimer()
    // }

  }

  startTest(){
    this.started=true;
  }

  canDeactivate():boolean{
    if(this.started){
      return confirm("Are you sure you want to leave the test? Your progress will be lost.")
    }
    return true;
  }

  preventBackButton(){
    history.pushState(null,location.href,null);
    this.locationSt.onPopState(()=>{
      history.pushState(null,location.href,null)
    })
  }

  onSelectionChange(questionIndex: number, optionIndex: number) {
    // Save the selected answer for the given question
    // this.answers[questionIndex] = this.questions[questionIndex].options[optionIndex];
    this.question[questionIndex].answer = this.questions[questionIndex].options[optionIndex]
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
        // this.answers = Array(this.questions.length).fill(-1);
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
    this.started=false;
    // const cid = this.login.getUser().username
    console.log(this.question)
    this._question.evalquiz(this.question,this.qid).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.attempted=data.attempted;
        this.correctAnswers=data.correctAnswer
        this.marksGot = this.correctAnswers * (this.quiz.maxMarks/this.questions.length)
        this.results = data.lst;
        console.log(this.results)
        for(var i=0;i<data.lst.length;i++){
          this.answers.push(data.lst[i]);
        }
        console.log(this.answers)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  printPage(){
    window.print()
  }


  checkIfAttempted(){

    this.userse.getUser(this.login.getUser().username).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.results=data;
        console.log(this.results.length)
        for(var i=0;i<this.results.length;i++){
          console.log(this.results[i].qId," ",this.qid)
          if(this.results[i].qId==this.qid){
            this.attempted=this.results[i].attempted;
            this.correctAnswers=this.results[i].correctAnswer
            this.marksGot = this.correctAnswers * (this.quiz.maxMarks/this.results[i].totalQuestions)
            // this.answers = this.results[i].
            this.isSubmitted=true
            this.started=false
            console.log("bhetla")
            return true;
          }
        }
        return false;
      },
      error(err) {
        console.log(err)
      },
    })
    console.log(this.results.length)
    return false;
  }
}

