import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {baseUrl, cartUrl, productUrl, userUrl} from "../../config/api";
import {CartItem} from "../models/cart-item";
import {map} from "rxjs/operators";
import {Product} from "../models/product";
import {listCartItem} from "../models/listproduct";
import {ProductService} from "./product.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  lenghtCart: number = 0;
   check1:boolean = false;
  list: CartItem[] = [];
  constructor(private http: HttpClient, private userService: UserService) {
  }

  getUserName() {
    if (this.userService.userValue) {
      return this.userService.userValue.username;
    } else
      return '';
  }

  //khi đã dăng nhập thì dùng từ dữ liệu file json
  getAllCartItems(username:any): Observable<any> {
    // TODO: Mapping the obtained result to our CartItem props. (pipe() and map())
    return this.http.get<CartItem[]>(cartUrl + '?userName=' + username);
  }


  addProductToCart(cartItem: any): Observable<any> {
    return this.http.post(cartUrl, cartItem);
  }

  deleteItem(idItem: number): Observable<any> {
    // console.log(this.http.delete (cartUrl+'/'+idItem ))
    return this.http.delete(cartUrl + '/' + idItem + '?username=' + this.getUserName());
  }

  putCartItem(cartItem: CartItem) {
    return this.http.put(cartUrl + '/' + cartItem.id + '?userName=' + this.getUserName(),
      {id: cartItem.id, product: cartItem.product, qty: cartItem.qty, userName: this.getUserName()});
  }

  updateQtyOfCartItem(cartItem: any) {
    return this.http.put(cartUrl + '/' + cartItem.id + '?userName=' + this.getUserName(),
      {id: cartItem.id, product: cartItem.product, qty: cartItem.qty, userName: this.getUserName()});
  }


  //khi chưa đăng nhập
  cartItem: CartItem | any;
  items: CartItem[] = [];

  getAllProWithCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(cartUrl);
  }


  addToCart(cartI: any) {
    let check = false;
    for (let i = 0; i < this.items.length; i++) {
      if (cartI.product.id == this.items[i].product.id) {
        this.items[i].qty++;
        check = true;
        break;
      }
    }
    if (!check) {
      this.items.push(cartI);
    }
  }



  //off sang onl
  putAllCartItemToUser(username:any) {
    let list:CartItem[] = [];
    this.getAllCartItems(username).subscribe((up)=>{
      list = up;
      for (let i= 0; i<this.getItemsOff().length;i++) {
        let check = false;
        for(let j=0; j<list.length;j++){
          if(this.getItemsOff()[i].product.id == list[j].product.id){
            let ite = list[j];
            ite.qty = ite.qty + this.getItemsOff()[i].qty;
            this.putCartItem(ite).subscribe(()=>console.log('><'));
            check = true;
            break;
          }
        }
        if(!check){
          let ite = new CartItem(this.getItemsOff()[i].product,this.getItemsOff()[i].qty,this.getUserName());
          this.addProductToCart(ite).subscribe(()=>console.log('.'));
        }

      }
    });

    // this.listcartData= this.getItemData(username);
    // console.log( this.listcartData )
    // let ite: any = {id: 0, product: Product, qty: 0, userName: ''}
    // for (let item of this.cartService.getItemsOff()) {
    //   let check=false;
    //   for (let i = 0; i < this.listcartData.length; i++) {
    //     if (item.product.id === this.listcartData[i].product.id) {
    //       ite.id = this.listcartData[i].product.id;
    //       ite.product = this.listcartData[i].product;
    //       ite.qty = this.listcartData[i].qty + item.qty;
    //       ite.userName = this.user.userName;
    //       this.cartService.putCartItem(ite).subscribe(() => console.log('><'));
    //       check = true;
    //       break;
    //
    //     }
    //     if (!check) {
    //       let ite1 = new CartItem(item.product, item.qty, this.user.userName);
    //       this.cartService.addProductToCart(ite1).subscribe(() => console.log('.'));
    //     }
    //
    //
    //   }
    // }
  }

//lay list CartItem tu cartoff
  getItemsOff() {
    return this.items;
  }

//xoa toan bo
  clearCart() {
    this.items = [];
    return this.items;
  }

//xoa CartItem trong cart off
  deleteItemOfOff(id
                    :
                    number
  ) {
    for (let x = 0; x < this.items.length; x++) {
      if (id == this.items[x].product.id) {
        this.items.splice(x, 1);
      }
    }
  }

//tăng so luong trong cart off
  pluss(id
          :
          number
  ) {
    for (let i = 0; i < this.items.length; i++) {
      if (id == this.items[i].product.id) {
        this.items[i].qty++;
      }
    }
  }

//giảm so luong trong cart off
  minus(id
          :
          number
  ) {
    for (let i = 0; i < this.items.length; i++) {
      if (id == this.items[i].product.id) {
        this.items[i].qty--;
      }
    }
  }

}


