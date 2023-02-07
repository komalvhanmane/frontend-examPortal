import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import * as XLSX from 'xlsx'
@Component({
  selector: 'app-add-quiz-questions',
  templateUrl: './add-quiz-questions.component.html',
  styleUrls: ['./add-quiz-questions.component.css']
})
export class AddQuizQuestionsComponent {
  public Editor:any=ClassicEditor
  
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
    console.log(this.qId)
    this.questions.quiz['qId']=this.qId
  }

  onSubmit(){
    if(this.questions.content.trim()==""){
      Swal.fire("Error","Enter the Question",'info')
      return;
    }
    if(this.questions.option1.trim()=="" || this.questions.option2.trim()=="" || this.questions.option3.trim()=="" || this.questions.option4.trim()==""){
      Swal.fire("Error","Enter the options","info")
      return;
    }
    if(this.questions.answer.trim()=="" || this.questions.answer==null ){
      Swal.fire("Error","Enter the answer","info")
      return;
    }
    console.log(this.questions.answer+"hello")
    this.questionService.addQuestionsToQuiz(this.questions).subscribe(
      (data)=>{
        Swal.fire("success","Question added successfuly",'success').then((e)=>{
          this.router.navigate(["/admin/view-questions/"+this.qId+"/"+this.title])
        })
        console.log(data)
      },
      (error)=>{
        Swal.fire("Error","Unable to add question Tryagain Later","error")
      }
    )
  }

  fileUpload(event:any){
    console.log(event.target.files)
    const selectedFiles = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFiles);

    fileReader.onload = (event)=>{
      console.log(event)
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData,{type:'binary'})
      // workbook.SheetNames.forEach(sheet =>{
      //   const data = XLSX.utils.sheet_add_json(workbook.Sheets[sheet]);
      // })
      var sheet_name_list = workbook.SheetNames;
      const data=XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      // console.log(workbook)
      // console.log(data[0])
      data.forEach(
        (data1:any)=>{
          this.questions.option1=data1.option1;
          this.questions.option2=data1.option2;
          this.questions.option3=data1.option3;
          this.questions.option4=data1.option4;
          this.questions.answer=data1.answer;
          this.questions.content=data1.content;
          // this.questions=data1;
          // this.qId=this.route.snapshot.paramMap.get("id")
          // this.questions.quiz['qId']=this.qId
          this.questionService.addQuestionsToQuiz(this.questions).subscribe(
            (data)=>{
              Swal.fire("success","Question added successfuly",'success').then((e)=>{
                this.router.navigate(["/admin/view-questions/"+this.qId+"/"+this.title])
              })
              console.log(data)
            },
            (error)=>{
              Swal.fire("Error","Unable to add question Tryagain Later","error")
            }
          )
        }
      )
    }
  }
}
