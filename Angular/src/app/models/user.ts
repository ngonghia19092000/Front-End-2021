import {CartItem} from "./cart-item";

export class User {
  username:string;
  email:string;
  fullname:string
  password:string;
  phone:string;
  adress:string;
  listCartItem:CartItem[];


  constructor(username: string, email: string, fullname: string, password: string, phone: string, adress: string,
              listCartItem:[] = []) {
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.password = password;
    this.phone = phone;
    this.adress = adress;
    this.listCartItem = listCartItem;
  }
}
