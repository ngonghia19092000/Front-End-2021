import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/cart-item";
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: User | undefined;
  usernamee: any = '';
  lengthCart: number | any;
  cart: CartItem[] = []

  constructor(private userApi: UserService,
              private router: Router,
              private cartService: CartService,) {
    this.update();

  }

  ngOnInit(): void {
    this.loadcart();

  }

  loadcart() {
    if (this.cartService.getUserName() == '') {
      this.lengthCart = this.cartService.getItemsOff().length;
    } else {
      let cart: any[] = []
      this.cartService.getAllCartLength(this.cartService.getUserName()).subscribe((data) => {
        cart = data;
        this.lengthCart = cart.length
      })
    }
  }

  update() {
    setInterval(() => {
      this.user = this.userApi.userValue;
      this.loadcart();
    }, 500);

  }

  logout() {
    this.userApi.logout();
    this.router.navigate(['/'])
  }

  name() {
    return this.usernamee = this.userApi.encryptMd5(<string>this.user?.username);
  }


}
