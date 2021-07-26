import {Product} from "./product";

export class CartItem {
  id: number;
  qty: number;
  product:Product;


  constructor(id: number, product: Product, qty :number) {
    this.id = id;
    this.qty = qty;
    this.product = product;
  }
}
