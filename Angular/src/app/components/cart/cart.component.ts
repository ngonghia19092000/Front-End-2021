import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/cart-item";
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];

  cartTotal = 0

  feeshippcost = 0

  constructor(
    private msg: MessengerService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    // this.handleSubscription();
    // this.loadCartItems();
  }

  // handleSubscription() {
  //
  //   this.msg.getMsg().subscribe((product: Product) => {
  //     this.loadCartItems();
  //   })
  // }

  // loadCartItems() {
  //   this.cartService.getCartItems().subscribe((items: CartItem[]) => {
  //     this.cartItems = items;
  //     this.calcCartTotal();
  //     this.shippcost();
  //   })
  // }

  // calcCartTotal() {
  //   this.cartTotal = 0
  //   this.cartItems.forEach(item => {
  //     this.cartTotal += (item.qty * item.price)
  //   })
  // }
  shippcost(){
    this.feeshippcost=0
    this.cartItems.forEach(item=>{
      if(this.cartItems.length>0)
      this.feeshippcost+=24000
    })
  }
}
