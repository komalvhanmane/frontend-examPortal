import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseURL from './Helper';

@Injectable({
  providedIn: 'root'
})

//manages whole login
export class LoginService {

  constructor(private http:HttpClient) { }

  public loginStatementSubject = new Subject<boolean>();

  public getCurrentUser(){
    return this.http.get(`${baseURL}/current-user`)
  }
  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${baseURL}/generate-token`,loginData)
  }

  //login user set the token in local store so that even after cloding browser it will be there
  public loginUser(token:any){
    // console.log(token)
    localStorage.setItem('token',token);
    this.loginStatementSubject.next(true);
    return true;
  }

  //check islogin
  public isloggedIn(){
    let tokenStr=localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr==null || tokenStr == ''){
      return false;
    }
    else{
      return true;
    }
  }

  //logout remove token from localstroge
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //gettoken
  public getToken(){
    return localStorage.getItem('token');
  }

  //store user details
  public setUserDetails(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //get User
  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  //get user Role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  //get status
  public getStatus(x:any){
    if(x==true){
      return "Active";
    }
    return "Deactivated";
  }
}
