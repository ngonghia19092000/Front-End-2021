import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {listUser} from "../../models/listuser";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string ='';
  pass:string = '';
  listUsers: User[]=[];
  login = false;


  constructor(private list:UserService) {

  }

  ngOnInit(): void {
  this.getUser();
  }


  getUser(){
    this.list.getUser().subscribe(
      upDate => this.listUsers =upDate
    );
  }

  checkUser(){

    for (let i = 0; i <=this.listUsers.length ; i++) {
      if(this.userName == listUser[i].username){
        if(this.pass == listUser[i].pass){
          this.login = true;
          window.alert("Đăng nhập thành công.")
        }
        else {
          window.alert('Sai tên tài khoản hoặc mật khẩu.');
        }
      }
      else {
        window.alert('Sai tên tài khoản hoặc mật khẩu.');
      }
    }

  }

  }
