import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes :any=
    {
      qId: '',
      title: "",
      description: "",
      maxMarks: "",
      numberOfQuestions: "",
      category: {
        cid: '',
        title: "",
        description: ''
      },
      active: ''
    }
    isActice=false;
  constructor(private quiz:QuizService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      (data)=>{
        this.quizzes=data;
        if(this.quizzes.active==true){
          this.isActice=true;
        }
        console.log(data)
      }
      ,
      (error)=>{
        console.log(error)
        alert("Error in Loading Data");
        return
      }
    )
  }

  deleteQuiz(qId:any){
    Swal.fire(
      {
        icon:'info',
        'title':"Are you sure ?",
        confirmButtonText:'Delete',
        showCancelButton:true
      }
    ).then(
      (result)=>{
        if(result.isConfirmed){
          //delete
          this.quiz.deleteQuiz(qId).subscribe(
            (data)=>{
              // this.quizzes.filter((quiz1: { qId: any; })=>quiz1.qId!=qId)
              Swal.fire("success",'Quiz deleted',"success").then((e)=>{
                window.location.reload()
              })
              // window.location.reload()
            },
            (error)=>{
              Swal.fire("Error","Error while deleting quiz",'error')
              this.snack.open("Error While Deleting")
            }
          )
        }
      }
    )
  }

  
}
