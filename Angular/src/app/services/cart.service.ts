import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {baseUrl, cartUrl, productUrl, userUrl} from "../../config/api";
import {CartItem} from "../models/cart-item";
import {map} from "rxjs/operators";
import {Product} from "../models/product";
import {listCartItem} from "../models/listproduct";
import {ProductService} from "./product.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
lenghtCart:number=0;
  constructor(private http: HttpClient,private userService:UserService) {
  }

  getUserName(){
    if(this.userService.userValue){
      return this.userService.userValue.username;
    }else
    return '';
  }

  //khi đã dăng nhập thì dùng từ dữ liệu file json
  getAllCartItems():Observable<any> {
    // TODO: Mapping the obtained result to our CartItem props. (pipe() and map())
    return  this.http.get<CartItem[]>(cartUrl+'?userName='+this.getUserName());
  }


  addProductToCart(cartItem:any):Observable<any>{
    return this.http.post(cartUrl,cartItem);
  }

  deleteItem(idItem:number):Observable<any>{
    // console.log(this.http.delete (cartUrl+'/'+idItem ))
    return this.http.delete (cartUrl+'/'+idItem+'?username='+this.getUserName());
  }

  putCartItem(cartItem:CartItem){
    return this.http.put(cartUrl+'/'+cartItem.id+'?userName='+this.getUserName(),
      {id:cartItem.id,product:cartItem.product,qty:cartItem.qty,userName:this.getUserName()});
  }

  updateQtyOfCartItem(cartItem:any){
    return this.http.put(cartUrl+'/'+cartItem.id+'?userName='+this.getUserName(),
      {id:cartItem.id,product:cartItem.product,qty:cartItem.qty,userName:this.getUserName()});
  }


  //khi chưa đăng nhập
  cartItem:CartItem|any;
  items:CartItem[] = [];

  getAllProWithCart():Observable<CartItem[]>{
    return this.http.get<CartItem[]>(cartUrl);

  }


  addToCart(cartI:any){
    let check = false;
    for (let i = 0; i < this.items.length ; i++){
      if(cartI.id == this.items[i].id){
        this.items[i].qty++;
        check = true;
        break;
      }
    }
    if(!check){

      this.items.push(cartI);
    }
  }
  // thêm tất cả sản phẩm từ cartoff sang cart online
  putAllCartItemToUser(lenghtCart: any){
    let list:CartItem[] = [];
    this.getAllCartItems().subscribe((up)=>{
      list = up;
    });
    for (let item of this.items) {
      let check = false;
        for(let it of list){
          if(item.id == it.id){
            let ite = new CartItem(lenghtCart,item.product,item.qty,this.getUserName());
            this.putCartItem(ite).subscribe(()=>console.log('><'));
            check = true;
            break;
          }
        }
        if(!check){
          let ite = new CartItem(lenghtCart,item.product,item.qty,this.getUserName());
          this.addProductToCart(ite).subscribe(()=>console.log('.'));
        }
    }
  }
  //lay list CartItem tu cartoff
  getItemsOff() {
    return this.items;
  }

  //xoa toan bo
  clearCart() {
    this.items = [];
    return this.items;
  }

  //xoa CartItem trong cart off
  deleteItemOfOff(id:number){
    for (let x=0;x<this.items.length;x++) {
      if(id == this.items[x].id){
        this.items.splice(x,1);
      }
    }
  }

  //tăng so luong trong cart off
  pluss(id:number){
    for (let i = 0; i < this.items.length ; i++) {
      if(id == this.items[i].id){
        this.items[i].qty++;
      }
    }
  }
//giảm so luong trong cart off
  minus(id:number){
    for (let i = 0; i < this.items.length ; i++) {
      if(id == this.items[i].id){
        this.items[i].qty--;
      }
    }
  }

}


