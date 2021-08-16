import { Injectable } from '@angular/core';
import {CartItem} from "../models/cart-item";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {cartUrl} from "../../config/api";


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  cartItem:CartItem[]=[];
  constructor(private http:HttpClient) { }

  addListCartToOrder(list:CartItem[]){
    return this.cartItem = list;
  }

  getCartItemToOrder():Observable<any>{
    return of(this.cartItem);
  }

  deleteCartItem(id:any):Observable<any>{
    return this.http.delete(cartUrl + '/' + id);
  }
}
