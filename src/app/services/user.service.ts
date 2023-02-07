import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './Helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    
   }

  //user create
  public createUser(user:any){
    console.log(user);
    return this.http.post(`${baseURL}/userr/s`,user);
  }
}
