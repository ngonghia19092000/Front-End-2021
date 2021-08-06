import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {CartItem} from "../../models/cart-item";

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
  listOrder: Order[]=[];
  isChange:boolean = false;
  taget:CartItem[]|any;


  constructor(private userService: UserService,
              private router: Router,
              private activRouter: ActivatedRoute,
              private formBuilder: FormBuilder,
              private orderService:OrderService,
              ) {
  }

  ngOnInit(): void {
    this.user = this.userService.userValue;
    this.getOrder();
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
    let lenght =false
    if (this.model.password == this.model.confirmpass) {
      check = true;
    } else {
      check = false;
      mess += ('(Password does not match)')
    }
    if (this.model.password!=undefined&&(this.model.password.length >= 6 && this.model.password.length <= 18)) {
      lenght = true;
    } else {
      lenght = false;
      mess += (' (New password is more than 6 characters and less than 18 characters) ')
    }
    if ('1909'+this.userService.encryptMd5(this.model.currentPass)+'1909' == this.user.password && check == true&&lenght==true) {
      this.userService.changePassword('1909'+this.userService.encryptMd5(this.model.password)+'1909').subscribe((data) => {
        mess = (' (Change password successful)');
        window.alert('Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại tài khoản!');
        this.userService.logout();
        this.router.navigate(['login'])
      })
    } else {
      mess += ' (Old password is incorrect)'
    }
    console.log(mess+ ' check:'+check+ ' lenght:'+lenght)

  }
  // lấy đơn hàng từ data.json
  getOrder(){
   this.orderService.getOrder().subscribe((t)=>this.listOrder= t);
  }

  updateOrder(id:number){
    if(this.isChange == true){
      let item:any;
      for(let i of this.listOrder){
        if(i.id == id){
          item = new Order(i.userName,i.discount,i.status,i.cartItem);
        }
      }
      this.getOrder();
      this.isChange =false;
      this.orderService.updateOrder(item,id).subscribe();
    }
  }

  minus(id:any){
    for (let item of this.listOrder){
      for (let i = 0; i <item.cartItem.length ; i++) {
        if(item.cartItem[i].id == id){
          if(item.cartItem[i].qty>1){
            this.isChange = true;
            item.cartItem[i].qty--;
          }
        }
      }
    }
  }

  pluss(id:any){
    for (let item of this.listOrder){
      for (let i = 0; i <item.cartItem.length ; i++) {
        if(item.cartItem[i].id == id){
            this.isChange = true;
            item.cartItem[i].qty++;
          }
        }
      }
    }

    deleteItemInOrder(id:any){
      for (let item of this.listOrder){
        for (let i = 0; i <item.cartItem.length ; i++) {
          if(item.cartItem[i].id == id){
            item.cartItem.splice(i,1);
          }
        }
      }
    }

    deleteOrder(id:any){
    this.orderService.deleteOrder(id).subscribe();
    this.getOrder();
    }

}




