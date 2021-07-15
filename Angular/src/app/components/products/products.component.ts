import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {CategoryfilterPipe} from "../../services/filter/categoryfilter.pipe";
import value from "*.json";

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
  categoryfill:string = "";



  ngOnInit() {
    this.getProduct();
    this.update();
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






}
