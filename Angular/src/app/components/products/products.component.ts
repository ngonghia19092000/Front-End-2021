import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

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
  constructor(private productService:ProductService) {}
  pricefill:number = 0;
  ngOnInit() {
    this.productService.getProducts().subscribe((products:Product[]) => {
    this.productList=products;
    this.totalLength = this.productList.length;
    })
  }

  sortByPriceT(){
    console.log('sort')
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
    console.log('sort')
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





}
