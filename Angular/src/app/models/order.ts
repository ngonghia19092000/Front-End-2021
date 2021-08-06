import {CartItem} from "./cart-item";

export class Order{
  userName:string;
  discount:string;
  status:string;
  cartItem:CartItem[];
  id:number|any;


  constructor(userName:string, discount:string, status:string,cartItem:CartItem[]) {
    this.userName = userName;
    this.discount = discount;
    this.status = status;
    this.cartItem = cartItem;
  }


}
