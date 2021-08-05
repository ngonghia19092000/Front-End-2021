import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/cart-item";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: User | undefined;
  usernamee:any  ='';

  cartItems:CartItem[] = [];
  constructor(private userApi:UserService,
              private router:Router) {
    this.user = this.userApi.userValue;

  }

  ngOnInit(): void {

  }
  searchProduct(product:string){

  }
  logout() {
    this.userApi.logout();
    window.location.reload()
    this.router.navigate(['/'])
  }

 name(){
 return this.usernamee= this.userApi.encryptMd5(<string>this.user?.username);
 }



}
