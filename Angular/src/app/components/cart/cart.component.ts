import {Component, OnInit} from '@angular/core';

import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/cart-item";

import {Router} from "@angular/router";

import {UserService} from "../../services/user.service";

import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";

import {User} from "../../models/user";
import {Discount} from "../../models/discount";
import {Provinces} from "../../models/provinces";
import {Districts} from "../../models/districts";
import {Wards} from "../../models/wards";
import {AddressItem} from "../../models/address-item";
import {CheckoutService} from "../../services/checkout.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  listOrder: Order[] = [];
  btn: boolean = false;
  paymentAddress: string | any;
  shippingAddress: AddressItem[] = [];
  address_check1: boolean = false;
  user: User | any;
  userInfo: User | any;
  code: any;
  addressSuccess: any;
  model: any = {};
  address: any = {phone: '', province: '', districts: '', wards: '', addressDetails: '', name: ''};
  province: Provinces[] = [];
  listdistricts: Districts[] = [];
  districts: Districts[] = [];
  wards: Wards[] = [];
  listWards: Wards[] = [];
  taget: number | any;
  array: CartItem[] = [];
  selectt: boolean = false;
  _fb: FormGroup | any;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private route: Router,
    private userservice: UserService,
    private order: OrderService,
    private checkoutService: CheckoutService,

  ) {
    this.update();
  }


  ngOnInit() {
    this.loadCartItems();
    this.getPrice();
    this.user = this.userservice.userValue;
    this.model.sp = 0;


  }

  loadCartItems() {
    // return this.cartItems = this.cartService.getCart();
    if (this.userservice.userValue) {
      this.cartService.getAllCartItems(this.userservice.userValue.username).subscribe((up) => {
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
        if (id == i.product.id) {
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
        if (id == i.product.id) {
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
      for (let i of this.cartItems) {
        if (i.product.id == id)
          this.cartService.deleteItem(i.id).subscribe((s) => {
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Đã xóa',
              showConfirmButton: false,
              timer: 1500
            })
            this.loadCartItems();
          });
      }
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
  getPrice() {
    let price = 0;
    for (const item of this.cartItems) {
      price += item.qty * item.product.price
      if (price > 0) {
        this.btn = true;
      }
    }
    return price;

  }

  shipCost() {
    return this.cartItems.length * 30000
  }

  loadUser() {
    this.userservice.addDataLocalStorage(this.userInfo);

  }


  update() {
    setInterval(() => {
      this.user = this.userservice.userValue;

    });
  }

  //lấy list sản phẩm truyền vào checkout
  checkOut() {
this.checkoutService.addListCartToOrder(this.array);

  }


// chọn sản phẩm để tiến hành thanh toan
  addSp(e: any, id: any) {
    if (e.target.checked) {
      for (let cartItem of this.cartItems) {
        if (cartItem.id == id) {
          this.array.push(cartItem);
        }
      }
    } else {
      for (let arr of this.array) {
        if (arr.id == id) {
          let index = this.array.indexOf(arr);
          this.array.splice(index, 1)

        }

      }
    }
  }


  alert() {
    Swal.fire({
      position: 'top',
      icon: 'info',
      title: 'Click chọn sản phẩm để thanh toán',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
