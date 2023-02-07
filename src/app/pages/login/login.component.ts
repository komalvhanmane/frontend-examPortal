import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''
  }
  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("login form submitted")

    if(this.loginData.username=='' || this.loginData.username==null){
      this.snack.open("Username is required",'ok')
      return;
    }
    if(this.loginData.password=='' || this.loginData.password==null){
      this.snack.open("password is required",'ok')
      return;
    }

    //generste token
    this.login.generateToken(this.loginData).subscribe(
      (data)=>{
        console.log("success")
        // for (const key of Object.keys(data)){
        //   if(data.hasOwnProperty(key)){
        //     // let value=data[key];
        //   }
        //   console.log(key)
        // }
        // dataToken : String 
        Object.entries(data).forEach(
          ([key, value]) => this.login.loginUser(value)
        );
        console.log(data)

        //now login if token generated

        // this.login.loginUser(data);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUserDetails(user);
            console.log(user);
            //redirect
            if(this.login.getUserRole()=="Admin"){
              console.log("hello1")
              this.router.navigate(['admin'])
              
              // window.location.href='/admin'
            }
            else if(this.login.getUserRole()=="Normal"){
              this.router.navigate(['userDash'])
              // window.location.href='/userDash'
            }
            else{
              this.login.logout();
            }
            //if admin then admin dashboard
            //if noraml then normal
          }
        );

      },
      (error)=>{
        console.log("Error")
        console.log(error)
        this.snack.open("Invalid Details . Try Again",'ok')
      }
    )
  }
}
