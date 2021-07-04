import { Component, OnInit } from '@angular/core';
import products from '../../files/products.json';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() {}

  public productslist:{id:String,img:string,name:string,pricesale:number,price:number}[]=products;
  ngOnInit(): void {

  }



}
