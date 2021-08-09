import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {CategoryfilterPipe} from "../../services/filter/categoryfilter.pipe";
import value from "*.json";
import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart.service";
import {listProducts} from "../../models/listproduct";
import {CartItem} from "../../models/cart-item";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList:Product[]=[];
  searchedKeyword: string = "";
  totalLength:any;
  page:number = 1;
  @Input()productAddtoCart: Product|any;

  constructor(private productService:ProductService,
   private msg:MessengerService,
   private cartService:CartService) {}
  pricefill:number = 0;
  categoryfill:string = "";
  cartItem:CartItem[]=[];

  itemTaget:any;


  ngOnInit() {
    this.getAllProduct();
    this.update();
    this.getCart();
  }
  getAllProduct(){
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    });
  }

  update(){
    setInterval(()=>{
      if(this.categoryfill != ''){
        this.totalLength = CategoryfilterPipe.length;
      }
      else {
        this.totalLength = this.productList.length;
      }

    });
  }

  getCart(){
    this.cartService.getUserName();
    this.cartService.getAllCartItems( this.cartService.getUserName()).subscribe((t)=>{
      this.cartItem = t;
    })
  }

  sortByPriceT(){
    console.log('sort');
    this.productList.sort((a, b) =>{
      // @ts-ignore
      if (a.pricesale < b.pricesale){
        return 1;
      }
      // @ts-ignore
      if (a.pricesale > b.pricesale){
        return -1;
      }
      return 0
    });
  }

  sortByPriceG(){
    console.log('sort');
    this.productList.sort((a, b) =>{
      // @ts-ignore
      if (a.pricesale > b.pricesale){
        return 1;
      }
      // @ts-ignore
      if (a.pricesale < b.pricesale){
        return -1;
      }
      return 0
    });
  }

  public add(id:number){
    this.getCart();
    if(this.cartService.getUserName()!=''){
      this.AddToCart(id);
      console.log('login.....');
    }
    else {
      console.log('unlogin.....');
      let it:any;
      for (let i of this.productList) {
        if(i.id == id){
          it = new CartItem(i,1,'');
        }
      }
      this.cartService.addToCart(it);
    }
  }

public AddToCart(productid:number){
  let it:any;
  let check = false;
   for (let i of this.productList) {
     if(i.id == productid){
       it = new CartItem(i,1,this.cartService.getUserName());
     }
   }

  for (let item of this.cartItem) {
    if(productid == item.product.id){
      it = item;
      this.cartService.updateQtyOfCartItem(it).subscribe();
      this.getCart();
      check = true;
      break;
    }
  }

  if(check == false){
    this.cartService.addProductToCart(it).subscribe(()=>console.log(it.product.productname));
    this.getCart();
  }
 }




}
