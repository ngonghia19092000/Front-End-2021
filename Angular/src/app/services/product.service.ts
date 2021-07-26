import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product'
import {Observable} from "rxjs";
import {of} from "rxjs";
import {listProducts} from "../models/listproduct";
import {HttpClient} from "@angular/common/http";
import {productUrl} from "../../config/api";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    //TODO: Populate products from an API and return an Observable
    return this.http.get<Product[]>(productUrl);
  }
  //lấy sản phẩm theo id
  getProductById(id:any):Observable<Product |undefined>{
    return of(listProducts.find(product => product.id == id));
  }

}
