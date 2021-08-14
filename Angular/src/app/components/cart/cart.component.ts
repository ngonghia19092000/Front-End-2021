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
  shippingAddress:AddressItem[] =[];
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
  taget:number|any;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private route: Router,
    private userservice: UserService,
    private order: OrderService,
    private checkoutService:CheckoutService
  ) {
    this.update();
  }


  ngOnInit() {
    this.loadCartItems();
    this.getPrice();
    this.user = this.userservice.userValue;
    this.loadAddressVietNam();

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
            window.alert("Đã Xóa.")
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

  getOrder() {
    this.order.getOrder().subscribe((t) => this.listOrder = t);
  }

  addNewOrder(id:any) {
    this.getOrder();
    let dataAddress:AddressItem|any;
    let check = false;
    this.code = (Math.floor(Math.random() * 899999) + 100000).toString()
    for (let x of this.listOrder) {
      if (this.code != x.code) {
        check = true;
      }
    }

    if (!check || this.listOrder.length == 0) {
      for (let item of this.shippingAddress) {
        if(item.id==id){
          dataAddress=item;
        }
      }
      let item = new Order(this.cartService.getUserName(), new Discount("", 1), "Chờ xác nhận", this.cartItems, this.code,dataAddress );
      if (this.cartService.getUserName() != '') {
        if (this.cartItems.length != 0) {
          this.order.addNewOrder(item).subscribe(() => console.log('add New Order'));
          this.clearCart();
          this.loadCartItems();
          this.addressSuccess= ''+dataAddress.wards+', '+dataAddress.districts+', '+dataAddress.province;
        } else {
          console.log('Hãy chọn sản phẩm.');
        }
      } else {
        console.log('Bạn hãy đăng nhập.');
      }
    }
  }

  checkout() {

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

  getAddress() {
    this.shippingAddress = this.user.shippingAddress;
    if (this.shippingAddress.length !=0) {
      this.address_check1 = true;
    }
  }
  loadUser() {
    this.userservice.addDataLocalStorage(this.userInfo);
  }

  // thêm địa chỉ mới
  addNewAddress() {
    let address = new AddressItem((this.shippingAddress.length + 1), this.model.name, this.findNameProvince(this.model.province),
      this.findNameDistricts(this.model.district_code), this.findNameWards(this.model.wards), this.model.phoneup, this.address.addressDetails)
    this.shippingAddress.push(address)
    this.userservice.addNewAddress(this.shippingAddress).subscribe((data) => {
      this.userInfo = data
      this.loadUser();
      if (this.shippingAddress.length == 1) {
        window.location.reload();
      }
    })
  }

//cập nhật địa chỉ
  updateAddress(taget: any) {
    let address = new AddressItem((taget), this.model.name, this.findNameProvince(this.model.province),
      this.findNameDistricts(this.model.district_code), this.findNameWards(this.model.wards), this.model.phoneup, this.address.addressDetails)
    for (let shippingAddressKey of this.shippingAddress) {
      if (shippingAddressKey.id == taget) {
        let index = this.shippingAddress.indexOf(shippingAddressKey)
        this.shippingAddress.splice(index, 1);
        this.shippingAddress.splice(index, 0, address);

        this.userservice.addNewAddress(this.shippingAddress).subscribe((data) => {

          this.userInfo = data
          this.loadUser();

        })
      }

    }

  }
  loadAddressVietNam() {
    this.getAddress();
    this.loadProvince();
    this.loadDistricts(1)
    this.loadWards(1);
    this.model.province = 1;
    this.model.district_code = 1;
    this.model.wards = 1
    this.model.address1=0;
  }
  loadProvince() {
    this.userservice.getProvince().subscribe((data) => {
      this.province = data;
    })
  }
  loadDistricts(code: any) {
    this.listdistricts = []
    this.userservice.getDistricts().subscribe((data) => {
      this.districts = data;
      for (let districtsKey of this.districts) {
        if (districtsKey.province_code == code) {
          this.listdistricts.push(districtsKey);

        }
      }
    })
  }
  loadWards(code: any) {
    this.listWards = []
    this.userservice.getWards().subscribe((data) => {
      this.wards = data;
      for (let item of this.wards) {
        if (item.district_code == code) {
          this.listWards.push(item);

        }
      }
    })
  }
  findNameDistricts(code: any) {
    let name = '';
    for (const item of this.listdistricts) {
      if (item.code == code) {
        name = item.name
      }
    }
    return name;
  }
  findNameProvince(code: any) {
    let name = '';
    for (const item of this.province) {
      if (item.code == code) {
        name = item.name
      }
    }
    return name;
  }
  findNameWards(code: any) {
    let name = '';
    for (const item of this.listWards) {
      if (item.code == code) {
        name = item.name
      }
    }
    return name;
  }
  checkaddress() {
    if (this.shippingAddress.length == 0||this.model.address1==0) {
      return false;
    } else
      return true;
  }

  update() {
    setInterval(() => {
      this.user = this.userservice.userValue;
    });
  }

  //lấy list sản phẩm truyền vào checkout
  checkOut(){
    this.checkoutService.addListCartToOrder(this.cartItems);
    this.clearCart();
  }
}
