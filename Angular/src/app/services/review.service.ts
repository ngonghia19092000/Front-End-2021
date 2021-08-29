import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Review} from "../models/review";
import {reviewUrl} from "../../config/api";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) {  }


  createReview(review:Review):Observable<Review>{
    return this.http.post<Review>(reviewUrl,review);
  }
  deleteReview(id:any):Observable<any>{
    return this.http.delete<any>(reviewUrl+'/'+id)
  }
  editReview(data:any):Observable<Review>{
    return this.http.put<Review>(reviewUrl+'/'+data.id,{id:data.id,content:data.content,user:data.user,rate:data.rate,product_id:data.product_id,name:data.name})
  }
  getReviewWithProduct(id:any):Observable<Review>{
    return this.http.get<Review>(reviewUrl+'?product_id='+id);
  }
  getAllReviewProduct():Observable<Review>{
    return this.http.get<Review>(reviewUrl);
  }
}
