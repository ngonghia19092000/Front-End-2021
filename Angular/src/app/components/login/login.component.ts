import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {ControlValueAccessor, Form, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/cart-item";
import {Product} from "../../models/product";
import {cartUrl} from "../../../config/api";
import Swal from "sweetalert2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public listUsers: User[] = [];
  model: any = {};
  form: FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: string | any;
  notification: string = '';
  public user: Observable<User> | any;
  userSubject: BehaviorSubject<User> | any;
  lenghtCart: any;
  cartList: CartItem[] = [];
  listcartData: any= [];
  check1: boolean = false;

  constructor(private list: UserService,
              private route: ActivatedRoute,
              private api: UserService,
              private router: Router,
              private cartService: CartService) {

    // redirect to home if already logged in
    if (this.api.userValue) {
      this.router.navigate(['/']);

    }

    this.lenghtCart = this.lenghtItemWithCart();




  }

  ngOnInit(): void {
    this.getUser();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.getAllCart();


  }

  getUser() {
    this.api.getAllUser()
      .subscribe((data) => {
          this.listUsers = data
        }
      );
  }

  getItemData(username:any) {
   this.cartService.getAllCartItems(username).subscribe((data) => {
      this.listcartData = data;
    });
return this.listcartData;
  }

  loginAccount() {
    for (let i of this.listUsers) {
      if (this.model.userName === i.username) {
        if ('1909' + this.api.encryptMd5(<string>this.model.password) + '1909' === i.password) {
          this.api.login = true;
          this.alert('Đăng nhập thành công','success',1000)
          this.api.addDataLocalStorage(i); this.router.navigate([this.returnUrl]);
          this.putAllCartItemToUser(this.model.userName);

          break;
        } else {
         this.alert('Tài khoản hoặc mật khẩu không chính xác','warning',1500)
        }
      }
    }

  }

  // thêm tất cả sản phẩm từ cartoff sang cart online
  putAllCartItemToUser(username:any) {
      let list:CartItem[] = [];
      this.cartService.getAllCartItems(username).subscribe((up)=>{
        list = up;
        for (let i= 0; i<this.cartService.getItemsOff().length;i++) {
          let check = false;
          for(let j=0; j<list.length;j++){
            if(this.cartService.getItemsOff()[i].product.id == list[j].product.id){
              let ite = list[j];
              ite.qty = ite.qty + this.cartService.getItemsOff()[i].qty;
              this.cartService.putCartItem(ite).subscribe(()=>console.log('><'));
              check = true;
              break;
            }
          }
          if(!check){
            let ite = new CartItem(this.cartService.getItemsOff()[i].product,this.cartService.getItemsOff()[i].qty,this.cartService.getUserName());
            this.cartService.addProductToCart(ite).subscribe(()=>console.log('.'));
          }

        }
      });

  }

  getAllCart() {
    this.cartService.getAllProWithCart().subscribe((data) => {
      this.cartList = data;
    });
  }

  lenghtItemWithCart() {
    return this.cartList.length;

  }


  alert(mess: any, type: any,time:any) {
    Swal.fire({
      position: 'top',
      icon: type,
      title: mess,
      showConfirmButton: false,
      timer: time
    })
  }

}
