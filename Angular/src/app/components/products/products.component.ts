import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {CategoryfilterPipe} from "../../services/filter/categoryfilter.pipe";
import value from "*.json";
import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart.service";
import {listProducts} from "../../models/listproduct";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList:Product[]=[];
  searchedKeyword: string = "";
  totalLength:any;
  page:number = 1;
  @Input()productAddtoCart: Product|any;

  constructor(private productService:ProductService
  ,
              private msg:MessengerService,
              private cartService:CartService) {}
  pricefill:number = 0;
  categoryfill:string = "";



  ngOnInit() {
    this.getAllProduct();
    // this.getProduct();
    // this.update();
  }
getAllProduct(){
  this.productService.getProducts().subscribe((products) => {
    this.productList = products;
  });
}
  getProduct(){
    this.productService.getProducts().subscribe(
      upDate => this.productList =upDate
    );
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

public AddToCart(productid:number){
   for (let i = 0; i < this.productList.length; i++) {
     if(productid===(this.productList[i].id)) {
       this.cartService.addProductToCart(this.productList[i]).subscribe(() => {
         this.msg.sendMsg(this.productList[i])
       })
     }
   }
 }




}
