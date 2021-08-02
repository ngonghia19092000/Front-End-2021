import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {userUrl} from "../../../config/api";

import {Router} from "@angular/router";
import {User} from "../../models/user";
import {ifStmt} from "@angular/compiler/src/output/output_ast";
import {UserService} from "../../services/user.service";
import {CartItem} from "../../models/cart-item";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alert: boolean = false;
  registerForm: FormGroup | any;
  passForm: FormGroup | any;
  count: number = 0;
  listUsers: User[] = [];
  public model: any = {};
  checkStt: boolean = false;
  validate: any = {mFullname: '', mUser: '', mPass: '', mPhone: '', mEmail: '', mAddress: '', mConfirmPass: ''}
  user:User|undefined;
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
    this.passForm = new FormGroup({
      confirmpass: new FormControl('')
    })

    this.api.getAllUser().subscribe(((user) => {
      this.listUsers = user;
    }));

  }


  checkuser() {
    if (this.validateData() == true&& this.confirmPass()==true) {
      let a = this.checkExist();
      console.log(a, this.listUsers.length)
      if (this.count != 0) {
        window.alert('Tên tài khoản ' + this.registerForm.value.username + ' đã được tạo');
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
    // this.user = new User(this.registerForm.value.username,this.registerForm.value.email,
    //   this.registerForm.value.fullname,this.registerForm.value.password,this.registerForm.value.phone,this.registerForm.value.address);
    this.api.registerUser(this.registerForm).subscribe((result) => {
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
