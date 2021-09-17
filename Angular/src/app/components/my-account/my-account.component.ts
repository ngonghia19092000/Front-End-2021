import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {CartItem} from "../../models/cart-item";
import {StatusPipe} from "../../services/filter/status.pipe";
import {Provinces} from "../../models/provinces";
import {Districts} from "../../models/districts";
import {Wards} from "../../models/wards";
import {AddressItem} from "../../models/address-item";
import Swal from "sweetalert2";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  form: FormGroup | any;
  user: User | any;
  userInfo: User | any;
  model: any = {phone: 0}
  is_edit: boolean = true;
  check: boolean = false;
  listOrder: Order[] = [];
  isChange: boolean = false;
  taget: CartItem[] | any;
  paymentAddress: string | any;
  shippingAddress: AddressItem[] = [];
  address_check: boolean = false;
  address_check1: boolean = false;
  address: any = {phone: '', province: '', districts: '', wards: '', addressDetails: '', name: ''};
  province: Provinces[] = [];
  listdistricts: Districts[] = [];
  districts: Districts[] = [];
  wards: Wards[] = [];
  listWards: Wards[] = [];


  //lọc và chia order theo trạng thái
  countFillStatus:any;
  orderStatus: string = '';
  orderStatus_1: Order[] = [];//cho xac nhan
  orderStatus_2: Order[] = [];//dang giao
  orderStatus_3: Order[] = [];//da giao
  orderStatus_4: Order[] = [];//da huy


  constructor(private userService: UserService,
              private router: Router,
              private activRouter: ActivatedRoute,
              private formBuilder: FormBuilder,
              private orderService: OrderService,
  ) {
    this.update();

  }

  ngOnInit(): void {
    this.user = this.userService.userValue;
    this.getOrder();
    this.loadAddressVietNam();
  }

  update() {
    setInterval(() => {
      this.user = this.userService.userValue;
      this.fillOrderStatus();
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/'])
  }

  loadUser() {
    this.userService.addDataLocalStorage(this.userInfo)

  }

  updateInfo() {
    this.is_edit = false;
    this.check = true;
// @ts-ignore
    document.getElementById('btnUpd').style.display = 'none'
    // @ts-ignore
    document.getElementById('btnExit').style.display = 'inline'
    // @ts-ignore
    document.getElementById('btn-updateaccount').style.display = 'inline'
  }

  back() {
    this.is_edit = true;
    this.check = false;
    // @ts-ignore
    document.getElementById('btnUpd').style.display = 'inline'

    // @ts-ignore
    document.getElementById('btnExit').style.display = 'none'
    // @ts-ignore
    document.getElementById('btn-updateaccount').style.display = 'none'

  }

  updateAccount() {
    if ((this.model.phoneup == undefined && this.model.email == undefined && this.model.address == undefined)
      || (this.model.phoneup == '' && this.model.email == '' && this.model.address == '')) {
      this.userService.updateInfoAccount(this.userService.userValue).subscribe((data) => {
        this.userInfo = data;

        this.loadUser();
        this.alert('Đã cập nhật dữ liệu','info')
        console.log(this.model)
      })
    } else {

      this.model.phone = this.model.phoneup;
      this.userService.updateInfoAccount(this.model).subscribe((data) => {
        this.userInfo = data;
        this.loadUser();
        this.alert('Đã thay đổi thông tin','success')
        this.model.phoneup = '';
        this.model.email = '';
        this.model.address = '';
        console.log('loading...');
        console.log(this.model)
      })
    }

  }

  changePass() {
    let mess = '';
    let check = false;
    let lenght = false
    if (this.model.password == this.model.confirmpass) {
      check = true;
    } else {
      check = false;
      mess += ('(Password does not match)')
      this.alert('Mật khẩu mới không trùng khớp','warning')
    }
    if (this.model.password != undefined && (this.model.password.length >= 6 && this.model.password.length <= 18)) {
      lenght = true;
    } else {
      lenght = false;
      mess += (' (New password is more than 6 characters and less than 18 characters) ')
      this.alert('Mật khẩu dài hơn 6 ký tự','warning')
    }
    if ('1909' + this.userService.encryptMd5(this.model.currentPass) + '1909' == this.user.password && check == true && lenght == true) {
      this.userService.changePassword('1909' + this.userService.encryptMd5(this.model.password) + '1909').subscribe((data) => {
        mess = (' (Change password successful)');
        this.alert('Thay đổi mật khẩu thành công. \n Vui lòng đăng nhập lại tài khoản!','success')
        Swal.fire({
          title: 'Thay đổi mật khẩu thành công.',
          text: "Vui lòng đăng nhập lại tài khoản!",
          icon: 'success',
          confirmButtonColor: '#2ce1e9',

          confirmButtonText: 'Đồng ý',

        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.logout();
            this.router.navigate(['login'])
          }

        })

      })
    }
    else if ('1909' + this.userService.encryptMd5(this.model.currentPass) + '1909' != this.user.password ) {
      this.alert('Mật khẩu cũ không chính xác','warning')
      mess += ' (Old password is incorrect)'
    }

    console.log(mess)

  }

  // lấy đơn hàng từ data.json

  getOrder() {
    this.orderService.getOrder().subscribe((t) => this.listOrder = t);
  }

  updateOrder(id: number) {
    if (this.isChange == true) {
      let item: any;
      for (let i of this.listOrder) {
        if (i.id == id) {
          item = new Order(i.userName, i.discount, i.status, i.cartItem, i.code, i.addressShip,i.priceOrder);
        }
      }
      this.getOrder();
      this.isChange = false;
      this.orderService.updateOrder(item, id).subscribe();
    }
  }

  minus(id: any) {
    for (let i = 0; i < this.taget.length; i++) {
      if (this.taget[i].id == id) {
        this.isChange = true;
        this.taget[i].qty--;
      }
    }
  }

  pluss(id: any) {
    for (let i = 0; i < this.taget.length; i++) {
      if (this.taget[i].id == id) {
        this.isChange = true;
        this.taget[i].qty++;
      }
    }
  }

  deleteItemInOrder(id: any) {
    for (let item of this.listOrder) {
      for (let i = 0; i < item.cartItem.length; i++) {
        if (item.cartItem[i].id == id) {
          item.cartItem.splice(i, 1);
        }
      }
    }
  }

  deleteOrder(id: any) {
    for (let item of this.listOrder) {
      if (item.id == id) {
        this.fillOrderStatus();
        this.orderService.updateOrderStatus(item).subscribe();
        this.alert('Đã hủy đơn hàng','success')
      }
    }
    this.getOrder();
  }

//check list địa chỉ
  loadAddress() {
    this.shippingAddress = this.user.shippingAddress;
    if (this.shippingAddress.length != 0) {
      this.address_check1 = true;
    }
  }

  loadAddressVietNam() {
    this.loadAddress();
    this.loadProvince();
    this.loadDistricts(1)
    this.loadWards(1);
    this.model.province = 1;
    this.model.district_code = 1;
    this.model.wards = 1
  }

  // load dữ liệu tỉnh thành
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

//tìm quận huyện
  findNameDistricts(code: any) {
    let name = '';
    for (const item of this.listdistricts) {
      if (item.code == code) {
        name = item.name
      }
    }
    return name;
  }

//tìm tỉnh thành
  findNameProvince(code: any) {
    let name = '';
    for (const item of this.province) {
      if (item.code == code) {
        name = item.name
      }
    }
    return name;
  }

//tìm phường xã
  findNameWards(code: any) {
    let name = '';
    for (const item of this.listWards) {
      if (item.code == code) {
        name = item.name
      }
    }
    return name;
  }

  //loc order theo trạng thái
  public fillOrderStatus() {
    this.orderStatus_1 = [];//cho xac nhan
    this.orderStatus_2 = [];//dang giao
    this.orderStatus_3 = [];//da giao
    this.orderStatus_4 = [];//da huy

    for (const item of this.listOrder) {
      if (item.status == 'Chờ xác nhận') {
        this.orderStatus_1.push(item);
      } else if (item.status == 'Đang Giao') {
        this.orderStatus_2.push(item);
      } else if (item.status == 'Đã Giao') {
        this.orderStatus_3.push(item);
      } else {
        this.orderStatus_4.push(item);
      }
    }
  }

  //tổng tiền cho đơn hàng
  totalPrice(cart: CartItem[], discount: number) {
    let total: number = 0;
    for (let i of cart) {
      total = total + (i.qty * i.product.pricesale);
    }
    return total * discount;

  }

// thêm địa chỉ mới
  addNewAddress() {
    let id=0;

    if(this.shippingAddress.length==0){
      id =1;
    }else {
    id= this.shippingAddress[this.shippingAddress.length-1].id+1
       for (let shippingAddress1 of this.shippingAddress) {
        if(shippingAddress1.id==id){
          id=this.shippingAddress[this.shippingAddress.length-1].id+2;
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
      this.alert('Thêm địa chỉ mới thành công','success')
      if (this.shippingAddress.length == 1) {
        window.location.reload();
      }
    })
  }

//xóa địa chỉ tại vị trí index
  deleteAddress(taget: any) {
    for (let shippingAddressKey of this.shippingAddress) {
      if (shippingAddressKey.id == taget) {
        let index = this.shippingAddress.indexOf(shippingAddressKey)
        this.shippingAddress.splice(index, 1);
        this.userService.addNewAddress(this.shippingAddress).subscribe((data) => {
          this.userInfo = data
          this.loadUser();
          this.alert('Đã xóa địa chỉ','success')
          if (this.shippingAddress.length == 0) {
            window.location.reload();
          }
        })
      }

    }

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
  alert(mess: any, type: any) {
    Swal.fire({
      position: 'center',
      icon: type,
      title: mess,
      showConfirmButton: false,
      timer: 3000
    })
  }
}




