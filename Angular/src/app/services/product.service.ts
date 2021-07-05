import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Product } from 'src/app/models/product'
import {Observable} from "rxjs";
import {productUrl} from "../../config/api";


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]> {
    //TODO: Populate products from an API and return an Observable
    return this.http.get<Product[]>(productUrl);

  }
}
