import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [
    {
      cid:"",
      title:"",
      description :"",
    }
  ]
  constructor(private category:CategoryService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error)
      alert("Error in loading data")
    })
  }

  onSubmit1(cid:any){
    console.log(cid);
    return this.category.deleteCategories(cid).subscribe(
      (data:any)=>{
        // this.snack.open("Deleted successfully","ok")
         Swal.fire("success","Deleted Successfully","success").then((e)=>{
          // window.location.reload()
        })
      }
      ,
      (error)=>{
        this.snack.open("Try again Later")
        console.log(error)
      }
    )
  }
}
