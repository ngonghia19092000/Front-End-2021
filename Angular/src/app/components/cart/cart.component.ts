import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/cart-item";
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import value from "*.json";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems:CartItem[] = [];
  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private route:Router,
    private userservice:UserService
  ) {}



  ngOnInit() {
    this.loadCartItems();
  }


  loadCartItems() {
   // return this.cartItems = this.cartService.getCart();
   //  this.cartService.getAllCartItems().subscribe((up)=>{this.cartItems = up});
    if(this.userservice.userValue){
      // this.cartService.getAllCartItems().subscribe((up)=>{this.cartItems = up});
      this.userservice.userValue.listCartItem = this.cartItems;
    }
    else {
      this.cartItems = this.cartService.getItemsOff();
    }
  }

//tăng số lượng
  clickPluss(id:number){
    for(let i of this.cartItems){
      if(id == i.id){
        i.qty++;
        this.cartService.putCartItem(i).subscribe(() => console.log("update"));
      }
    }
  }


//giảm số lượng
  clickMinus(id:number){
    for(let i of this.cartItems){
      if(id == i.id){
        if(i.qty > 1){
          i.qty--;
          this.cartService.putCartItem(i).subscribe(() => console.log("update"));
        }
      }
    }
  }

  deleteCartItem(id:number){
    this.cartService.deleteItem(id).subscribe((s)=>{
      window.alert("Đã Xóa.")
      this.loadCartItems();
    });
  }
  // thêm tất cả sản phẩm từ cart khi chưa đăng nhập vào giỏ hàng của user
  putAll(){
  }
}
