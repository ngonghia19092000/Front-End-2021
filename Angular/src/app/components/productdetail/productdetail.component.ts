import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import value from "*.json";
// import {CartService} from "../../services/cart.service";

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


  constructor(
    private route:ActivatedRoute,
    private service:ProductService,
    // private cart:CartService,
  ) { }

  ngOnInit(): void {
    this.loadProductDetail();
    this.update();
  }
  update(){
    setInterval(()=>{
      // console.log(this.size);
      // console.log(this.color);
    });
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
}
