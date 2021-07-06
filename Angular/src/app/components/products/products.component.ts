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

  totalLength:any;
  page:number = 1;
  constructor(private productService:ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products:Product[]) => {
    this.productList=products;
    this.totalLength = this.productList.length;
    })
  }




}
