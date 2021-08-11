import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {orderUrl} from "../../config/api";
import {Order} from "../models/order";
import {CartItem} from "../models/cart-item";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private user:UserService, private http:HttpClient) { }


  getOrder():Observable<Order[]>{
    return this.http.get<Order[]>(orderUrl+'?userName='+this.getUserName());
  }

  getUserName(){
    if(this.user.userValue){
      return this.user.userValue.username;
    }
    return "";
  }

  addNewOrder(order:Order):Observable<any>{
    return this.http.post(orderUrl,order);
  }

  updateOrder(order:Order,id:any):Observable<any>{
    return this.http.put(orderUrl+'/'+id+'?userName='+this.getUserName(),{code:order.code,
      userName:order.userName,discount:order.discount,status:order.status,cartItem:order.cartItem,
     shippingAddress:order.shippingAddress,id:id
    });
  }

  updateOrderStatus(order:any):Observable<any>{
    return this.http.put(orderUrl+'/'+order.id,{
      code:order.code,id:order.id,userName:order.userName,discount:order.discount,status:'Đã hủy',
      cartItem:order.cartItem,paymentAddress:order.paymentAddress,shippingAddress:order.shippingAddress});
  }

}
