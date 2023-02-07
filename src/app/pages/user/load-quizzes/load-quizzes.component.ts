import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-load-quizzes',
  templateUrl: './load-quizzes.component.html',
  styleUrls: ['./load-quizzes.component.css']
})
export class LoadQuizzesComponent {
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
  catId:any;
  constructor(private _route:ActivatedRoute,private _quizService:QuizService){
    
  }

  ngOnInit(){

    this._route.params.subscribe((params)=>
    {
      this.catId=params['categoryId'];
      console.log(this.catId)
        if(this.catId==0){
          console.log("load all the quizzes")
          // this._quizService.quizzes().subscribe(
            this._quizService.getActiveQuizzes().subscribe(
            (data)=>{
              this.quizzes=data;
              console.log(this.quizzes)
            }
            ,
            (error)=>{
              Swal.fire("error","Server Error in Loading Data","error")
            }
          )
        }
        else{
          // this.quizzes=[]
          console.log("Hello1")
          this._quizService.getActiveCategoryQuizzes(this.catId).subscribe(
            (data)=>{
              console.log("Hello2")
              this.quizzes=data;
              console.log("helllllo",this.quizzes,"Good morninf")
            },
            (error)=>{
              console.log(error)
              Swal.fire("error","Error in loading data","error")
            }
          )
        }
    })
    // this.catId=this._route.snapshot.paramMap.get("categoryId")
    

    
  }
}
