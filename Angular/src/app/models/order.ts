import {CartItem} from "./cart-item";
import {Discount} from "./discount";

export class Order{
  userName:string;
  discount:Discount;
  status:string;
  cartItem:CartItem[];
  id:number|any;
  code:string;
  shippingAddress:[];


  constructor(userName: string, discount: Discount, status: string, cartItem: CartItem[], code: string, shippingAddress: []) {
    this.userName = userName;
    this.discount = discount;
    this.status = status;
    this.cartItem = cartItem;
    this.code = code;
    this.shippingAddress = shippingAddress;
  }
}
