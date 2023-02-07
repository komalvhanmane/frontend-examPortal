import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './Helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  //get all questions of quiz
  public getQuizQuestions(qId:any){
    return this.http.get(`${baseURL}/question/quiz/all/${qId}`)
  }

  //get all questions for test
  public getQuizQuestionsForTest(qId:any){
    return this.http.get(`${baseURL}/question/quiz/${qId}`)
  }

  //add Questions to quiz
  public addQuestionsToQuiz(Questions:any){
    return this.http.post(`${baseURL}/question/`,Questions)
  }

  //delete Questions
  public deleteQuestion(qid:any){
    return this.http.delete(`${baseURL}/question/${qid}`)
  }

  //get Question
  public getQuestion(qid:any){
    return this.http.get(`${baseURL}/question/${qid}`)
  }

  //update Question
  public updateQuestion(Question:any,qid:any){
    return this.http.put(`${baseURL}/question/`,Question)
  }
}
