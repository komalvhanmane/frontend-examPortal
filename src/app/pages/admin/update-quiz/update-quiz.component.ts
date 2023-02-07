import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {

  constructor(private route:ActivatedRoute,
    private _quiz:QuizService,
    private category:CategoryService,
    private router:Router){

  }
  categories:any={
    cid:'',
    title:'',
    description:''
  }
  qId1:any
  quiz:any={
    qId: '',
    title: "",
    description: "",
    maxMarks: "",
    numberOfQuestions: "",
    category: {
      cid: '',
      title:'',
      description:''
    },
    active: true
  }
  ngOnInit() : void{
    this.qId1=this.route.snapshot.paramMap.get('qId')
    // alert(this.qId)
    this.quiz=this._quiz.getQuiz(this.qId1).subscribe(
      (data)=>{
        this.quiz=data;
        // this.quiz.category.cid
        console.log(this.quiz)
      }
      ,
      (error)=>{
        console.log(error)
      }
    )

    this.category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error)
      alert("Error in loading category data")
    })
  }

  onSubmit(){
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire("success","Quiz Updated Successfully",'success').then((e)=>{
          this.router.navigate(['/admin/view-quizzes'])
        })
        console.log(data)
      }
      ,
      (error)=>{
        Swal.fire("error","Uanble to update !! Please Try again","error")
        console.log(error)
      }
    )
  }

}
