import { Injectable } from '@angular/core';
import {CartItem} from "../models/cart-item";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  cartItem:CartItem[]=[];
  constructor() { }

  addListCartToOrder(list:CartItem[]){
    return this.cartItem = list;
  }

  getCartItemToOrder():Observable<any>{
    return of(this.cartItem);
  }

}
