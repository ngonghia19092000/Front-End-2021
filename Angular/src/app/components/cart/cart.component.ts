import {Component, OnInit} from '@angular/core';
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
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";
import {MyAccountComponent} from "../my-account/my-account.component";
import {User} from "../../models/user";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  listOrder: Order[] = [];
btn:boolean=false;
  paymentAddress: string | any;
  shippingAddress: string | any;
  address_check: boolean = false;
  address_check1: boolean = false;
  user:User|any;
  address: any = {};
  userInfo:User|any;
  code:any;
  addressSuccess:any;
  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private route: Router,
    private userservice: UserService,
    private order: OrderService,
  ) {
  }


  ngOnInit() {
    this.loadCartItems();
    this.getPrice();
    this.user=this.userservice.userValue;
  }


  loadCartItems() {
    // return this.cartItems = this.cartService.getCart();
    if (this.userservice.userValue) {
      this.cartService.getAllCartItems().subscribe((up) => {
        this.cartItems = up
      });
    } else {
      this.cartItems = this.cartService.getItemsOff();
    }
  }

//tăng số lượng
  clickPluss(id: number) {
    if (this.cartService.getUserName() != '') {
      for (let i of this.cartItems) {
        if (id == i.id) {
          i.qty++;
          this.cartService.putCartItem(i).subscribe(() => console.log("update"));
        }
      }
    } else {
      this.cartService.pluss(id);
    }
  }


//giảm số lượng
  clickMinus(id: number) {
    if (this.cartService.getUserName() != '') {
      for (let i of this.cartItems) {
        if (id == i.id) {
          if (i.qty > 1) {
            i.qty--;
            this.cartService.putCartItem(i).subscribe(() => console.log("update"));
          }
        }
      }
    } else {
      this.cartService.minus(id);
    }
  }

  deleteCartItem(id: number) {
    if (this.cartService.getUserName() != '') {
      this.cartService.deleteItem(id).subscribe((s) => {
        window.alert("Đã Xóa.")
        this.loadCartItems();

      });
    } else {
      this.cartService.deleteItemOfOff(id);
      window.alert("xóa sp từ cart off");
      this.loadCartItems();
    }

  }

  clearCart() {
    for (let i = 0; i < this.cartItems.length; i++) {
      this.cartService.deleteItem(this.cartItems[i].id).subscribe(() => console.log('clear'));
    }
  }

  getOrder() {
    this.order.getOrder().subscribe((t) => this.listOrder = t);
  }

  addNewOrder() {
    this.getOrder();
    let check = false;
    this.code = Math.floor(Math.random() * 999999).toString()
    for (let x of this.listOrder) {
      if (this.code != x.code) {
        check = true;
      }
    }
    if (!check||this.listOrder.length==0) {
      let item = new Order(this.cartService.getUserName(), '', "Chờ xử lý", this.cartItems,this.code,this.paymentAddress,this.shippingAddress);
      if (this.cartService.getUserName() != '') {
        if (this.cartItems.length != 0) {
          this.order.addNewOrder(item).subscribe(() => console.log('add New Order'));
          this.clearCart();
          this.loadCartItems();

        } else {
          console.log('Hãy chọn sản phẩm.');
        }
      } else {
        console.log('Bạn hãy đăng nhập.');
      }
    }
  }
  checkout(){

  }

  getPrice() {
    let price = 0;
    for (const item of this.cartItems) {
      price += item.qty * item.product.price
      if(price>0){
        this.btn =true;
      }
    }
    return price;

  }

  shipCost() {
   return this.cartItems.length* 30000
  }

  getAddress() {
      this.paymentAddress = this.user.paymentAddress;
      this.shippingAddress = this.user.shippingAddress;
      if (this.paymentAddress.province != undefined) {
        this.address_check = true;
      }
      if (this.shippingAddress.province != undefined) {
        this.address_check1 = true;
      }
      this.addressSuccess= ' '+this.paymentAddress.apartment + ', ' + this.paymentAddress.street+', '
    +  this.paymentAddress.wards + ', ' + this.paymentAddress.district + ', ' + this.paymentAddress.province;


  }
  loadUser() {
    this.userservice.addDataLocalStorage(this.userInfo);
    location.reload();
  }
  putAddress() {
    if (this.address.value != '') {
      this.userservice.putPaymentAddress(this.address).subscribe((data) => {
        this.userInfo = data;
        this.loadUser();
      })
    }
  }

  putAddress1() {
    if (this.address.value != '') {
      this.userservice.putShippingAddress(this.address).subscribe((data) => {
        this.userInfo = data;
        this.loadUser();
      })
    }
  }
}
