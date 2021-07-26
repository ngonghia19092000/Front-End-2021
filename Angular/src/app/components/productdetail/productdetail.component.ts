import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import value from "*.json";
import {listProducts} from "../../models/listproduct";
import {CartService} from "../../services/cart.service";
import {ProductsComponent} from "../products/products.component";
import {MessengerService} from "../../services/messenger.service";
import {CartItem} from "../../models/cart-item";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  product: Product | undefined;
  value:number = 1;
  size:string = '';
  color:string = '';
  cartItem:CartItem[]=[];


  constructor(
    private route:ActivatedRoute,
    private service:ProductService,
    private cartSer:CartService,
   private msg:MessengerService
  ) { }

  ngOnInit(): void {
    this.loadProductDetail();
    this.update();

  }
  update(){
    this.cartSer.getAllCartItems().subscribe((up)=>{this.cartItem = up});
  }

  loadProductDetail(){
    const proID = this.route.snapshot.paramMap.get('id');
    let id:any = proID;
    this.service.getProductById(id).subscribe(pro => this.product = pro);
    console.log(proID);
  }
  //lấy sản phẩm từ file json.

  // addToCart(product: Product) {
  //   this.cart.addToCart(product);
  // }

  //tăng số lượng
  clickPluss(){
    this.value++;
  }
//giảm số lượng
  clickMinus(){
    if(this.value > 1){
      this.value--;
    }
  }

  putCart(product:Product){
    let items = new CartItem(product.id, product, this.value);
    let check = false;
    for(let item of this.cartItem){
      if(item.id == product.id){
        items.qty= items.qty + item.qty;
        this.cartSer.updateQtyOfCartItem(items).subscribe(()=> console.log('update'));
        check = true;
        this.update();
        break;
      }
    }
  if(check == false) {
      this.cartSer.addProductToCart(items).subscribe(()=>console.log(items.product.productname));
      this.update();
    }
  }

  // addToCart(product:Product) {
  //   let item = new CartItem(product.id, product, this.value);
  //   this.cartSer.addProductToCart(item).subscribe(()=>console.log(item.product.productname));
  // }
}
