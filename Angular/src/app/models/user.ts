import {Product} from "./product";

export class User {
  id:number;
  username:string;
  pass:string;
  adress:string;
  sdt:string;
  listPro:[];

  constructor(id:number, username:string, pass:string, adress:string, sdt:string) {
    this.id = id;
    this.username = username;
    this.pass = pass;
    this.adress = adress;
    this.sdt = sdt;
    this.listPro = [];
  }

}
