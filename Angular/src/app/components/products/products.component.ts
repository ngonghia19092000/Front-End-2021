import { Component, OnInit } from '@angular/core';
import products from 'src/app/files/products.json';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
productList:Product[]=[]
  constructor(private productService:ProductService) {}
  // public productList:{id:String,img:string,name:string,pricesale:number,price:number}[]=products;

  ngOnInit() {
this.productService.getProducts().subscribe((products:Product[]) => {
this.productList=products;
    })
  }



}
