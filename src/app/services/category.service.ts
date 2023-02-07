import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './Helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  //load all categories
  public categories(){
    return this.http.get(`${baseURL}/category/`)
  }

  //add new Categories
  public addCategory(category:any){
    return this.http.post(`${baseURL}/category/`,category)
  }

  //delete categorie
  public deleteCategories(cid:any){
    console.log(cid)
    console.log(`${baseURL}/category/${cid}`)
    return this.http.delete(`${baseURL}/category/${cid}`)
  }
}
