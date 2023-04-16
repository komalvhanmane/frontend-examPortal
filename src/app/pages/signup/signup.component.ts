import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userSErvice:UserService, private snack:MatSnackBar) { }

  //direct onbject
  public user={
    "fname":'',
    "lname" :'',
    "username":'',
    "password":'',
    "phone":'',
    "email":''
  }
  ngOnInit(): void {
  }

  //signup form submit
  FormSubmit(): void{
    if(this.user.username=='' || this.user.username==null){
      // alert("Username is required")
      this.snack.open("Username is required" ,'ok')
      return;
    }
    // alert(this.user.email)
    // adding user
    //it return observer so we need subscribe and here we can see error/succes
    this.userSErvice.createUser(this.user).subscribe(
      (data)=>{
        //sssss
        console.log(this.user.email,"Hello");
        this.snack.open("Registraition succesful" ,'ok')

        // alert("Registraition succesful")
      },
      (error)=>{
        this.snack.open("Something went wrong" ,'ok')

        // alert("Something went error")
      }
    )
  }




}
