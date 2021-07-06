import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product'
import {Observable} from "rxjs";
import {of} from "rxjs";
import {listProducts} from "../models/listproduct";
import {NgxPaginationModule} from 'ngx-pagination';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor() { }

  getProducts(): Observable<Product[]> {
    //TODO: Populate products from an API and return an Observable
    return of(listProducts);
  }
  //lấy sản theo id
  getProductById(id:any):Observable<Product |undefined>{
    return of(listProducts.find(product => product.id === id));
  }
}
