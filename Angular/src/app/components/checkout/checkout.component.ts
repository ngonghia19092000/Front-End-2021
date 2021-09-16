import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartItem} from "../../models/cart-item";
import {CheckoutService} from "../../services/checkout.service";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";
import {UserService} from "../../services/user.service";
import {Provinces} from "../../models/provinces";
import {Districts} from "../../models/districts";
import {Wards} from "../../models/wards";
import {AddressItem} from "../../models/address-item";
import {User} from "../../models/user";
import {Discount} from "../../models/discount";
import {CartService} from "../../services/cart.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user: User | any;
  listItem: CartItem[] = [];
  model: any = {};
  address: any = {phone: '', province: '', districts: '', wards: '', addressDetails: '', name: ''};
  province: Provinces[] = [];
  listdistricts: Districts[] = [];
  districts: Districts[] = [];
  wards: Wards[] = [];
  listWards: Wards[] = [];
  shippingAddress: AddressItem[] = [];
  address_check1: boolean = false;
  userInfo: User | any;
  listDiscount: Discount[] = [];
  listOrder: Order[] = [];

  constructor(private checkout: CheckoutService,
              private orderService: OrderService,
              private userService: UserService,
              private router: Router,
              private cartSer: CartService) {
    this.update();
  }

  ngOnInit(): void {
    this.getCartItem();
    this.user = this.userService.userValue;
    this.loadAddressVietNam();
    this.listDiscount = this.user.listVoucher;
  }

  update() {
    setInterval(() => {
      this.user = this.userService.userValue;
    });
  }

  loadUser() {
    this.userService.addDataLocalStorage(this.userInfo);
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

  // thêm địa chỉ mới
  addNewAddress() {
    let id = 0;

    if (this.shippingAddress.length == 0) {
      id = 1;
    } else {
      id = this.shippingAddress[this.shippingAddress.length - 1].id + 1
      for (let shippingAddress1 of this.shippingAddress) {
        if (shippingAddress1.id == id) {
          id = this.shippingAddress[this.shippingAddress.length - 1].id + 2;
          break;
        }
      }
    }
    let address = new AddressItem((id), this.model.name, this.findNameProvince(this.model.province),
      this.findNameDistricts(this.model.district_code), this.findNameWards(this.model.wards), this.model.phoneup, this.address.addressDetails)
    this.shippingAddress.push(address)
    this.userService.addNewAddress(this.shippingAddress).subscribe((data) => {
      this.userInfo = data
      this.loadUser();
      this.alert('Thêm địa chỉ mới thành công', 'success')
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
        this.userService.addNewAddress(this.shippingAddress).subscribe((data) => {
          this.userInfo = data
          this.loadUser();
          this.alert('Cập nhật địa chỉ thành công','success')

        })
      }

    }

  }

  getAddress() {
    this.shippingAddress = this.user.shippingAddress;
    if (this.shippingAddress.length != 0) {
      this.address_check1 = true;
    }
    return this.address_check1;
  }


  loadAddressVietNam() {
    this.getAddress();
    this.loadProvince();
    this.loadDistricts(1)
    this.loadWards(1);
    // Đặt các giá trị mặc định
    this.model.province = 1;
    this.model.district_code = 1;
    this.model.wards = 1
    this.model.address1 = 0;
    this.model.discount = 1;
  }

  loadProvince() {
    this.userService.getProvince().subscribe((data) => {
      this.province = data;
    })
  }

  loadDistricts(code: any) {
    this.listdistricts = []
    this.userService.getDistricts().subscribe((data) => {
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
    this.userService.getWards().subscribe((data) => {
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
    if (this.shippingAddress.length == 0 || this.model.address1 == 0) {
      return false;
    } else
      return true;
  }

//Discount
  getDiscount(discount: any) {
    let a: Discount | any;
    if (discount == 1) {
      a = 0;
    }

    for (let item of this.listDiscount) {
      if (item.codeDiscount == discount) {
        a = item;
        break;
      }
    }
    return a;
  }

// Chọn địa chỉ thanh toán
  selectAddress(address: any): AddressItem {
    let a: AddressItem | any;
    if (address == 0) {
      a = this.shippingAddress[0];
    }

    for (let shippingAddress1 of this.shippingAddress) {
      if (shippingAddress1.id == address) {
        a = shippingAddress1;
        break;
      }
    }
    return a;
  }

//tổng tiền sản phẩm
  getPrice() {
    let price = 0;
    for (const item of this.listItem) {
      price += item.qty * item.product.price
    }
    return price;
  }

  // áp dụng mã giảm giá
  applyVoucher(code: any) {

    let result = 0
    if (code == 1) {
      result = 0;
    } else {
      for (let listDiscountElement of this.listDiscount) {
        if (listDiscountElement.codeDiscount == code) {
          result = listDiscountElement.rate / 100 * this.getPrice();
          break;
        }
      }
    }
    return result;
  }

  // phí vận chuyển
  shipCost() {
    return this.listItem.length * 30000
  }

  // tổng giá trị đơn hàng
  totalPrice() {
    return this.getPrice() + this.shipCost() - this.applyVoucher(this.getDiscount(this.model.discount).codeDiscount);
  }


  getOrder() {
    this.orderService.getOrder().subscribe((t) => this.listOrder = t);
  }


  confirmAddNewOrder(){
    Swal.fire({
      title: 'Xác nhận đặt hàng?',
      text: "Đồng ý và tiếp tục đặt hàng",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Hủy',
      confirmButtonText: 'Đặt hàng'

    }).then((result) => {
      if (result.isConfirmed) {
        this.addNewOrder();

      }
    })

  }
  addNewOrder() {
    this.getOrder();
    let dataAddress: AddressItem | any;
    let check = false;
    let code = (Math.floor(Math.random() * 899999) + 100000).toString()
    for (let x of this.listOrder) {
      if (code != x.code) {
        check = true;
      }
    }

    if (!check || this.listOrder.length == 0) {

      let item = new Order(this.user.username, this.checkdiscount(this.getDiscount(this.model.discount)), "Chờ xác nhận", this.listItem, code, this.selectAddress(this.model.address1), this.totalPrice());
      if (this.user.username != '') {
        if (this.listItem.length != 0) {
          this.orderService.addNewOrder(item).subscribe(() => console.log('add New Order'));
          this.deleteCart(this.listItem);
          Swal.fire({
            title: 'Đơn hàng #'+code +' đã được tạo thành công',
            text: "Cảm ơn bạn đã đặt hàng",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3de5cb',
            confirmButtonText: 'Tiếp tục mua sắm',
            cancelButtonText:'Đơn hàng của tôi'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['cart'])
            }
            if(result.isDismissed){

              this.router.navigate(['my-account/'+ this.userService.encryptMd5(this.user.username)+''])
            }
          })

        } else {
          console.log('Hãy chọn sản phẩm.');
        }
      } else {
        console.log('Bạn hãy đăng nhập.');
      }
    }

  }
 checkdiscount(discountvalue:any ){
    let b:any ;
    if(discountvalue==0){
      b='';
    }
    if(discountvalue!=0){
      b=discountvalue
    }
    return b;
 }
  deleteCart(arr: any) {
    for (let j = 0; j < arr.length; j++) {
      this.checkout.deleteCartItem(arr[j].id).subscribe(data => {
        console.log('OK')
      })
    }
  }

  alert(mess: any, type: any) {
    Swal.fire({
      position: 'top',
      icon: type,
      title: mess,
      showConfirmButton: false,
      timer: 2000
    })
  }
}



