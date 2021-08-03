import {Product} from "./product";

export class CartItem {
  id: number;
  qty: number;
  product:Product;
  userName:string;


  constructor(id: number, product: Product, qty :number,userName:string) {
    this.id = id;
    this.qty = qty;
    this.product = product;
    this.userName = userName;
  }
}
