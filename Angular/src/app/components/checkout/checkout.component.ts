import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CartItem} from "../../models/cart-item";
import {CheckoutService} from "../../services/checkout.service";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";
import {UserService} from "../../services/user.service";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listItem: CartItem[] = [];

  constructor(private checkout: CheckoutService,
              private order: OrderService,
              private user: UserService) {
  }

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem() {
    this.checkout.getCartItemToOrder().subscribe((up) => this.listItem = up);
  }

  deleteItem(id: any) {
    for (let i of this.listItem) {
      if (i.product.id == id) {
        this.listItem.splice(this.listItem.indexOf(i), 1);
      }
    }
  }

  minusQty(id: any) {
    for (let i = 0; i < this.listItem.length; i++) {
      if (this.listItem[i].product.id == id) {
        if (this.listItem[i].qty > 1) {
          this.listItem[i].qty--;
        }
      }
    }
  }

  plussQty(id: any) {
    for (let i = 0; i < this.listItem.length; i++) {
      if (this.listItem[i].product.id == id) {
        this.listItem[i].qty++;
      }
    }
  }
}



