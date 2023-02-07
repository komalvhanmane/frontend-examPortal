import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent {
  qId:any
  title:any
  questions:any = [
    {
      queId:'',
      quiz :{
        qId:''
      },
      content : '',
      image : '',
      option1 : '',
      option2 : '',
      option3 : '',
      option4 : '',
      answer : ''
    }
  ]

  constructor(
    private route:ActivatedRoute,
    private quesService:QuestionService
  ){}

  ngOnInit():void{
    console.log("hello")
    this.qId=this.route.snapshot.paramMap.get("id")
    this.title=this.route.snapshot.paramMap.get("title")

    console.log(this.qId+this.title)

    this.quesService.getQuizQuestions(this.qId).subscribe(
      (data)=>{
        this.questions=data;
        console.log(data)
      }
      ,
      (error)=>{
        Swal.fire("success","Error while loading data",'error')
      }
    )
    
  }

  public deleteQue(qid:any){
    console.log(qid)
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
          this.quesService.deleteQuestion(qid).subscribe(
            (data)=>{
              Swal.fire("success",'Question deleted',"success").then((e)=>{
                window.location.reload()
              })
            },
            (error)=>{
              Swal.fire("Error","Error while deleting Question",'error')
            }
          )
        }
      }
    )
  }

  public updateQue(qid:any){
    
  }
}
