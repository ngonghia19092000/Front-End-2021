import {CartItem} from "./cart-item";
import {Discount} from "./discount";
import {AddressItem} from "./address-item";

export class Order{
  userName:string;
  discount:Discount;
  status:string;
  cartItem:CartItem[];
  id:number|any;
  code:string;
  addressShip:AddressItem;


  constructor(userName: string, discount: Discount, status: string, cartItem: CartItem[], code: string, addressShip: AddressItem) {
    this.userName = userName;
    this.discount = discount;
    this.status = status;
    this.cartItem = cartItem;
    this.code = code;
    this.addressShip = addressShip;
  }
}
