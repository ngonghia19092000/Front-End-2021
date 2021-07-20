import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {cartUrl} from "../../config/api";
import {CartItem} from "../models/cart-item";
import {map} from "rxjs/operators";
import {Product} from "../models/product";
import {listCartItem} from "../models/listproduct";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,
              private service: ProductService) { }

  getCartItems(): Observable<CartItem[]> {
    //TODO: Mapping the obtained result to our CartItem props. (pipe() and map())
    return this.http.get<CartItem[]>(cartUrl).pipe(
      map((result: any[]) => {
        let cartItems: CartItem[] = [];

        for (let item of result) {
          let productExists = false

          for (let i in cartItems) {
            if (cartItems[i].productId === item.product.id) {
              cartItems[i].qty++
              productExists = true
              break;
            }
          }
          if (!productExists) {
            cartItems.push(new CartItem(item.id, item.product));
          }
        }
        return cartItems;
      })
    );
  }

  addProductToCart(product: Product): Observable<any> {
    return this.http.post(cartUrl, { product });
  }
deleteItem(idItem:number):Observable<any>{
    // console.log(this.http.delete (cartUrl+'/'+idItem ))
  return this.http.delete (cartUrl+'/'+idItem);

}



  // product: Product | undefined;
  // items:any[] = [];
  // addToCart(product: Product) {
  //   this.items.push(product);
  //
  // }
  //
  // addToCartById(id:string|undefined){
  //   this.service.getProductById(id).subscribe(pro => this.product = pro)
  //   this.items.push(this.product);
  // }
  // getItems() {
  //   return this.items;
  // }
  // clearCart() {
  //   this.items = [];
  //   return this.items;
  // }
  //
  // deleteItemById(id:any){
  //   this.items.splice(this.items.indexOf(this.getItemById(id),1));
  // }
  //
  // getItemById(id: string | undefined):Observable<Product | undefined>{
  //   return of(this.items.find(product => product.id === id));
  // }
  //

}


