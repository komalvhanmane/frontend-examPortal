import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-quiz-questions',
  templateUrl: './update-quiz-questions.component.html',
  styleUrls: ['./update-quiz-questions.component.css']
})
export class UpdateQuizQuestionsComponent {
  
  queId:any
  qId:any
  title:any
  questions:any = 
    {
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

    constructor(
      private route:ActivatedRoute,
      private questionService:QuestionService,
      private router:Router
    ){
  
    }
  
    ngOnInit(){
      this.qId=this.route.snapshot.paramMap.get("id")
      this.title=this.route.snapshot.paramMap.get("title")
      this.queId=this.route.snapshot.paramMap.get("qid")
      console.log(this.qId)
      this.questions.quiz['qId']=this.qId

      this.questionService.getQuestion(this.queId).subscribe(
        (data)=>{
          this.questions=data;
        },
        (error)=>{
          Swal.fire("error","Error in loading data ","error")
        }
      )
    }

    onSubmit(){
      this.questionService.updateQuestion(this.questions,this.queId).subscribe(
        (data)=>{
          Swal.fire("success","Question Updated Successfully","success").then(
            (e)=>{
              this.router.navigate(["admin/view-questions/"+this.qId+"/"+this.title])
            }
          )
        }
        ,
        (error)=>{
          Swal.fire("error","Error in Updating Try agin",'error')
        }
      )
    }
}
