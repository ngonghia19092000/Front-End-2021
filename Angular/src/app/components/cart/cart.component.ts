import { Component, OnInit,OnDestroy } from '@angular/core';
import {Product} from "../../models/product";
import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/cart-item";
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import value from "*.json";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {
  cartItems:CartItem[] = [];
  public subscription: Subscription |any;
  cartTotal = 0
  value:number = 0;
  feeshippcost = 0

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private route:Router,
  ) { }



  ngOnInit() {
    this.handleSubscription();
    this.loadCartItems();
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  handleSubscription() {
    this.msg.getMsg().subscribe((product) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.calcCartTotal();
      this.shippcost();
    })
  }
  deleteCart(id:number){
    this.subscription=this.cartService.deleteItem(id).subscribe((item:CartItem[])=>{
      this.cartItems = item;
      this.updateToCartAfterDelete(id);
      this.route.navigate(['cart'])
    });
  }
//tăng số lượng
  clickPluss(plus:number){
    this.value++;
  }
//giảm số lượng
  clickMinus(minus:number){
    if(minus+this.value > 1){
      this.value--;
    }
  }
  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }
  shippcost(){
    this.feeshippcost=0
    this.cartItems.forEach(item=>{
      if(this.cartItems.length>0)
      this.feeshippcost+=24000
    })
  }

  private updateToCartAfterDelete(id: number) {
    for (let i = 0; i <this.cartItems.length ; i++) {
      if(this.cartItems[i].id==id){
        this.cartItems.slice(i,1);
        break;
      }
    }
  }
}
