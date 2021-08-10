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
  shippingAddress: string | any;
  address_check: boolean = false;
  address_check1: boolean = false;
  address: any = {};

  //lọc và chia order theo trạng thái
  orderStatus:string = '';
  orderStatus_1:Order[]=[];//cho xac nhan
  orderStatus_2:Order[]=[];//dang giao
  orderStatus_3:Order[]=[];//da giao
  orderStatus_4:Order[]=[];//da huy


  constructor(private userService: UserService,
              private router: Router,
              private activRouter: ActivatedRoute,
              private formBuilder: FormBuilder,
              private orderService: OrderService,
  ) {

  }

  ngOnInit(): void {
    this.user = this.userService.userValue;
    this.getOrder();
    this.loadAddress();
    this.fillOrderStatus();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/'])
  }

  loadUser() {
    this.userService.addDataLocalStorage(this.userInfo)
    location.reload();
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
        console.log('OK!')
      })
    } else {

      this.model.phone = this.model.phoneup;

      this.userService.updateInfoAccount(this.model).subscribe((data) => {
        this.userInfo = data;
        this.loadUser();
        this.model.phoneup = '';
        this.model.email = '';
        this.model.address = '';
        console.log('loading...');
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
    }
    if (this.model.password != undefined && (this.model.password.length >= 6 && this.model.password.length <= 18)) {
      lenght = true;
    } else {
      lenght = false;
      mess += (' (New password is more than 6 characters and less than 18 characters) ')
    }
    if ('1909' + this.userService.encryptMd5(this.model.currentPass) + '1909' == this.user.password && check == true && lenght == true) {
      this.userService.changePassword('1909' + this.userService.encryptMd5(this.model.password) + '1909').subscribe((data) => {
        mess = (' (Change password successful)');
        window.alert('Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại tài khoản!');
        this.userService.logout();
        this.router.navigate(['login'])
      })
    } else {
      mess += ' (Old password is incorrect)'
    }
    console.log(mess + ' check:' + check + ' lenght:' + lenght)

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
          item = new Order(i.userName, i.discount, i.status, i.cartItem, i.code,i.paymentAddress,i.shippingAddress);
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
      if(item.id == id){
        this.orderService.updateOrderStatus(item).subscribe();
      }
    }
    this.getOrder();
    this.fillOrderStatus();
  }

  loadAddress() {
    this.paymentAddress = this.user.paymentAddress;
    this.shippingAddress = this.user.shippingAddress;
    if (this.paymentAddress != undefined) {
      this.address_check = true;
    }
    if (this.shippingAddress != undefined || this.shippingAddress) {
      this.address_check1 = true;
    }

  }

  putAddress() {
    if (this.address.value != '') {
      this.userService.putPaymentAddress(this.address).subscribe((data) => {
        this.userInfo = data;
        this.loadUser();
      })
    }
  }

  putAddress1() {
    console.log(this.address.toString())
    if (this.address.value != '') {
      this.userService.putShippingAddress(this.address).subscribe((data) => {
        this.userInfo = data;
        this.loadUser();
      })
    }
  }

  //loc order theo trạng thái
  public fillOrderStatus() {
    this.orderStatus_1=[];//cho xac nhan
    this.orderStatus_2=[];//dang giao
    this.orderStatus_3=[];//da giao
    this.orderStatus_4=[];//da huy

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
  totalPrice(cart:CartItem[],discount:number){
    let total:number = 0;
      for(let i of cart){
        total = total + (i.qty*i.product.pricesale);
      }
      return total * discount;

  }


}




