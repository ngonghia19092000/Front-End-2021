import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {CartItem} from "../../models/cart-item";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user:User|undefined;
  constructor(
    private userservice:UserService
  ) {
    this.user = this.userservice.userValue;
    console.log(this.user.listCartItem);
  }

  ngOnInit(): void {
    // this.getUser();
  }


  logout(){
    this.userservice.logout();
  }
}


