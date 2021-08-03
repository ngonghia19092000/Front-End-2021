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
import {windowWhen} from "rxjs/operators";

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
    if(this.userservice.userValue){
      this.cartService.getAllCartItems().subscribe((up)=>{this.cartItems = up});
    }
    else {
      this.cartItems = this.cartService.getItemsOff();
    }
  }

//tăng số lượng
  clickPluss(id:number){
    if(this.cartService.getUserName()!=''){
      for(let i of this.cartItems){
        if(id == i.id){
          i.qty++;
          this.cartService.putCartItem(i).subscribe(() => console.log("update"));
        }
      }
    }
    else {
      this.cartService.pluss(id);
    }
  }


//giảm số lượng
  clickMinus(id:number){
    if(this.cartService.getUserName()!=''){
      for(let i of this.cartItems){
        if(id == i.id){
          if(i.qty > 1){
            i.qty--;
            this.cartService.putCartItem(i).subscribe(() => console.log("update"));
          }
        }
      }
    }
    else {
      this.cartService.minus(id);
    }
  }

  deleteCartItem(id:number){
    if(this.cartService.getUserName()!=''){
      this.cartService.deleteItem(id).subscribe((s)=>{
        window.alert("Đã Xóa.")
        this.loadCartItems();
      });
    }
    else {
      this.cartService.deleteItemOfOff(id);
      window.alert("xóa sp từ cart off");
      this.loadCartItems();
    }

  }
}
