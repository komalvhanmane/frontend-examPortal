import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prequiz',
  templateUrl: './prequiz.component.html',
  styleUrls: ['./prequiz.component.css']
})
export class PrequizComponent {
  qid:any;
  quiz:any
  constructor(private _route:ActivatedRoute,private quizService:QuizService,private router:Router){

  }

  ngOnInit():void{
    console.log("Hello Prequiz")
    this.qid=this._route.snapshot.paramMap.get("qid");
    // console.log(this.qid)
    this.quizService.getQuiz(this.qid).subscribe(
      (data)=>{
        // console.log(data)
        this.quiz=data
      },
      (error)=>{
        console.log(error)
        alert("Error in loading data")
      }
    )
  }

  startQuiz(){
    Swal.fire(
      {
        title:"Do you want to start the quiz",
        showCancelButton:true,
        confirmButtonText:"Continue",
        denyButtonText:"No I Dont want to",
        icon:'info'
      }
    ).then(
      (result)=>{
        if(result.isConfirmed){
          this.router.navigate(["/start/"+this.quiz.qId])
        }
      }
    )
  }
}
