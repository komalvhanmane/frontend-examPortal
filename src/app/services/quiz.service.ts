// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './Helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  //passing function as a parameter is callback
  //concept - dependency injection
  //private used that means this object is for class also
  constructor(private http:HttpClient) { }

  //get the data
  public quizzes(){
    return this.http.get(`${baseURL}/quiz/`)
  }

  //add quiz
  public addQuiz(quiz:any){
    return this.http.post(`${baseURL}/quiz/`,quiz)
  }

  //delete Quiz
  public deleteQuiz(qId:any){
    return this.http.delete(`${baseURL}/quiz/${qId}`)
  }

  //get the single quiz
  public getQuiz(qId:any){
    return this.http.get(`${baseURL}/quiz/${qId}`)
  }

  //update the data
  public updateQuiz(quiz:any){
    return this.http.put(`${baseURL}/quiz/`,quiz)
  }

  public getCategoryQuiz(cid:any){
    return this.http.get(`${baseURL}/quiz/category/${cid}`)
  }

  //get active quizzes
  public getActiveQuizzes(){
    return this.http.get(`${baseURL}/quiz/active`)
  }

  //get active category quizzes
  public getActiveCategoryQuizzes(cid:any){
    return this.http.get(`${baseURL}/quiz/active/${cid}`)
  }

}
