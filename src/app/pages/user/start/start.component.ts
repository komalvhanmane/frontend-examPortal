import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  qid:any;
  questions:any;
  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService
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

  loadQuestions(){
    this._question.getQuizQuestionsForTest(this.qid).subscribe(
      (data)=>{
        this.questions=data;
        // console.log(this.questions)
      }
      ,
      (error)=>{
        Swal.fire("error","Server While Loading Questions","error")
      }
    )
  }
}
