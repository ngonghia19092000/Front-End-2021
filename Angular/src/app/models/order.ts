import {CartItem} from "./cart-item";
import {Address} from "./address";
import {Discount} from "./discount";

export class Order{
  userName:string;
  discount:Discount;
  status:string;
  cartItem:CartItem[];
  id:number|any;
  code:string;
  paymentAddress:Address;
  shippingAddress:Address;


  constructor(userName: string, discount: Discount, status: string, cartItem: CartItem[], code: string, paymentAddress: Address, shippingAddress: Address) {
    this.userName = userName;
    this.discount = discount;
    this.status = status;
    this.cartItem = cartItem;
    this.code = code;
    this.paymentAddress = paymentAddress;
    this.shippingAddress = shippingAddress;
  }
}
