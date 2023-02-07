import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  category={
    title:'',
    description:''
  }
  constructor(private categoryy:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this.snack.open("Title Required",'ok')
      return;
    }
    else{
      this.categoryy.addCategory(this.category).subscribe(
        (data:any)=>{
          console.log(data)
          this.category.title=""
          this.category.description=""
          this.snack.open("Category is added successfully",'ok')
        }
        ,
        (error)=>{
          this.snack.open("Server Error , Try again Later",'ok')
        }
      )
    }
  }
}
