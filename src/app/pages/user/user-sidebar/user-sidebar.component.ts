import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  categories = [
    {
      cid:"",
      title:"",
      description :"",
    }
  ]
  constructor(private category:CategoryService){

  }

  ngOnInit(){
    this.category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error)
      alert("Error in loading data")
    })
  }
}
