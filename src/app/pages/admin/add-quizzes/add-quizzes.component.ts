import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit {

  categories = [
    {
      cid:"",
      title:"",
      description :"",
    }
  ]

  quizzes :any={
      qId: '',
      title: '',
      description: "",
      maxMarks: "",
      numberOfQuestions: "",
      category: {
        cid: '',
      },
      active: true
  }
  constructor(private quiz:QuizService,private category:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    //here we are passing function in the subscribe
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
    this.quiz.addQuiz(this.quizzes).subscribe(
      (data)=>{
        console.log(data)
        this.quizzes={
          qId: '',
      title: '',
      description: "",
      maxMarks: "",
      numberOfQuestions: "",
      category: {
        cid: '',
      },
      active: false
        }
        this.snack.open("Quiz added Successfully ", 'Ok')
      },
      (error)=>{
        this.snack.open("Error while adding quiz!! Try Again","ok")
        return
      }
    )
  }

}
