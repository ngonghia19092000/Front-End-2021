import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Address} from "../../models/address";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alert: boolean = false;
  registerForm: FormGroup | any;
  count: number = 0;
  newUser:any={username:'',email:'',fullname:'',password:'',phone:'',address:'',paymentAddress:Address,shippingAddress:Address,listVoucher:[]};
  listUsers: User[] = [];
  checkStt: boolean = false;
  validate: any = {mFullname: '', mUser: '', mPass: '', mPhone: '', mEmail: '', mAddress: '', mConfirmPass: ''}

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private api: UserService,
              private router: Router) {
  }

  ngOnInit() {

    this.registerForm = new FormGroup({
      fullname: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
    })
    this.api.getAllUser().subscribe(((user) => {
      this.listUsers = user;
    }));
  }


  checkuser() {

    if (this.validateData() && this.confirmPass()) {
      let a = this.checkExist();
      console.log(a, this.listUsers.length)
      if (this.count != 0) {
        window.alert('Tên tài khoản ' + this.registerForm.value.username + ' đã được tạo');
        this.count=0;
      } else {
        this.register();
      }
    }
  }

  checkExist(): number {
    for (var i = 0; i < this.listUsers.length; i++) {
      if (this.listUsers[i].username == this.registerForm.value.username) {
        this.count += 1;
      } else {
        this.count += 0;
      }
    }
    return this.count
  }

  validateData() {

    if (this.registerForm.value.username == '') {
      this.validate.mUser = ('Nhập tên tài khoản đăng nhập');
    } else {

      this.validate.mUser = '';
    }
    if (this.registerForm.value.fullname == '') {
      this.validate.mFullname = ('Nhập họ và tên ');
    } else {
      this.validate.mFullname = '';
    }
    if (this.registerForm.value.password == '') {
      this.validate.mPass = ('Mật khẩu không được bỏ trống');
    } else {
      this.validate.mPass = '';
    }
    if (this.registerForm.value.phone == '') {
      this.validate.mPhone = ('Nhập số điện thoại');
    } else {
      this.validate.mPhone = '';
    }
    if (this.registerForm.value.email == '') {
      this.validate.mEmail = ('Email không được để trống');
    } else {
      this.validate.mEmail = '';
    }
    if (this.registerForm.value.address == '') {
      this.validate.mAddress = ('Nhập địa chỉ của bạn');
    } else {
      this.validate.mAddress = '';
    }


    if (this.registerForm.value.username != '' &&
      this.registerForm.value.fullname != '' &&
      this.registerForm.value.email != '' &&
      this.registerForm.value.password != '' &&
      this.registerForm.value.address != '' &&
      this.registerForm.value.phone != '') {
      return this.checkStt = true;
    }


    return this.checkStt;
  }

  register() {

    this.newUser.username=this.registerForm.value.username;
    this.newUser.email=this.registerForm.value.email;
    this.newUser.fullname=this.registerForm.value.fullname;
    this.newUser.phone=this.registerForm.value.phone;
    this.newUser.address=this.registerForm.value.address;
    let address = new Address('','','','','','')
    this.newUser.password='1909'+this.api.encryptMd5(this.registerForm.value.password)+'1909';
    this.api.registerUser(this.newUser).subscribe((result) => {
      // console.warn("result",result)
      window.alert("Đăng ký tài khoản thành công")
      this.router.navigate(['login'])
    })
  }

  confirmPass() {
    // @ts-ignore
    if( document.getElementById('password').value !== document.getElementById('confirm_password').value){
      this.validate.mConfirmPass=("Mật khẩu không trùng khớp");
      return false;
    }else {
      this.validate.mConfirmPass=("");
      return true;
    }
    ;
  }

}
