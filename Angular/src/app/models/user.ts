import {CartItem} from "./cart-item";
import {Address} from "./address";

export class User {
  id:number;
  username:string;
  email:string;
  fullname:string
  password:string;
  phone:string;
  adress:string;
  listVoucher:[];
  paymentAddress:Address;
  shippingAddress:Address;


  constructor(id: number, username: string, email: string, fullname: string, password: string, phone: string, adress: string, listVoucher: [], paymentAddress: Address, shippingAddress: Address) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.password = password;
    this.phone = phone;
    this.adress = adress;
    this.listVoucher = listVoucher;
    this.paymentAddress = paymentAddress;
    this.shippingAddress = shippingAddress;
  }
}
