import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
// import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  product: Product | undefined;
  constructor(
    private route:ActivatedRoute,
    private service:ProductService,
    // private cart:CartService,
  ) { }

  ngOnInit(): void {
    this.loadProductDetail();
  }

  loadProductDetail(){
    const proID = this.route.snapshot.paramMap.get('id');
    let id:any = proID;
    this.service.getProductById(id).subscribe(pro => this.product = pro)
  }

  // addToCart(product: Product) {
  //   this.cart.addToCart(product);
  // }

}
