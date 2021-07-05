import {Product} from "./product";

export class CartItem {
  id: number;
  productId: number;
  productName: string;
  qty: number;
  price: number;
  img:string


  constructor(id: number, product: Product, qty = 1) {
    this.id = id;
    this.productId = product.id;
    this.productName = product.productname;
    this.qty = qty;
    this.price = product.pricesale;
    this.img =product.img;
  }
}
