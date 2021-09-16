import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import value from "*.json";
import {listProducts} from "../../models/listproduct";
import {CartService} from "../../services/cart.service";
import {ProductsComponent} from "../products/products.component";
import {MessengerService} from "../../services/messenger.service";
import {CartItem} from "../../models/cart-item";
import {publish} from "rxjs/operators";
import {CheckoutService} from "../../services/checkout.service";
import Swal from "sweetalert2";
import {ReviewService} from "../../services/review.service";
import {Review} from "../../models/review";
import {UserService} from "../../services/user.service";
import {formatDate} from "@angular/common";
import {User} from "../../models/user";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  product: Product | any;
  value: number = 1;
  size: string = '';
  color: string = '';
  cartItem: CartItem[] = [];
  cartList: CartItem[] = [];
  lenghtCart: number | any;
  review:any= {};
  start:number=1;
listReview:Review|any=[];
listRview2Item:any[]=[];
user:User|any;
  constructor(
    private userservice: UserService,
    private route: ActivatedRoute,
    private service: ProductService,
    private cartSer: CartService,
    private msg: MessengerService,
    private checkout: CheckoutService,
    private reviewService: ReviewService
  ) {
// this.updateRuntime();
  }

  ngOnInit(): void {
    this.loadProductDetail();
    this.update();
    this.getAllCart()
    this.loadReview();
    this.user =this.userservice.userValue;


  }

  update() {
    this.cartSer.getUserName();
    this.cartSer.getAllCartItems(this.cartSer.getUserName()).subscribe((up) => {
      this.cartItem = up;
      this.cartSer.addListCart(this.cartItem);
    });
  }

  loadProductDetail() {
    const proID = this.route.snapshot.paramMap.get('id');
    let id: any = proID;
    this.service.getProductById(id).subscribe(pro => this.product = pro);
  }

  //lấy sản phẩm từ file json.

  // addToCart(product: Product) {
  //   this.cart.addToCart(product);
  // }

  //tăng số lượng
  clickPluss() {
    this.value++;
  }

//giảm số lượng
  clickMinus() {
    if (this.value > 1) {
      this.value--;
    }
  }


  add(product: Product) {
    this.lenghtCart = this.lenghtItemWithCart();
    this.update();
    if (this.cartSer.getUserName() != "") {
      this.putCart(product);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Đã thêm vào giỏ hàng',
        showConfirmButton: false,
        timer: 1500
      })
      console.log("Đã đăng nhập");
    } else {
      let items = new CartItem(product, this.value, '');
      this.cartSer.addToCart(items);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Đã thêm vào giỏ hàng',
        showConfirmButton: false,
        timer: 1500
      })
      console.log("Chưa đăng nhập");

    }
  }

  putCart(product: Product) {
    let items = new CartItem(product, this.value, this.cartSer.getUserName());
    let idup = 0;
    let check = false;
    for (let item of this.cartItem) {
      if (item.product.id == product.id) {
        items.qty += item.qty;
        items.id = item.id
        this.cartSer.putCartItem(items).subscribe(() => console.log('update'));
        check = true;
        this.update();
        console.log(item.product.id + '' + product.id)
        break;
      }
    }
    if (check == false) {
      this.cartSer.addProductToCart(items).subscribe(() => console.log(items.product.productname));
      this.update();
    }


  }

  lenghtItemWithCart() {
    return this.cartList.length;
  }

  getAllCart() {
    this.cartSer.getAllProWithCart().subscribe((data) => {
      this.cartList = data;
    });
  }

  buynow(product: Product) {
    let item = new CartItem(product, this.value, this.cartSer.getUserName());
    let array = [];
    array.push(item)
    this.checkout.addListCartToOrder(array)

  }

  clickStart(start:number){
    this.start=start;
    return this.start;
  }
  createReview(productId:any){
    let now = new Date();
    let jstoday = formatDate(now, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    let review =new Review(this.review.content,this.userservice.userValue.username,this.start,productId,jstoday,this.userservice.userValue.fullname)
    this.reviewService.createReview(review).subscribe((data)=>{
this.alert('Cảm ơn bạn đã đánh giá','success');
    });

  }
  // updateRuntime() {
  //   setInterval(() => {
  //     this.loadReview();
  //   },500);
  // }
  page: number=1;
  loadReview(){
this.reviewService.getReviewWithProduct(this.product.id).subscribe((data)=>{
  this.listReview=data;
  if(this.listReview.length>=2){
    this.listRview2Item.push(this.listReview[0]);
    this.listRview2Item.push(this.listReview[1]);
  }
})
  }
  showAllReview(){
this.listRview2Item=this.listReview;
    // @ts-ignore
    document.getElementById('btnShow').style.display = 'none'
    // @ts-ignore
    document.getElementById('btnHide').style.display = 'inline'
  }

  loadStart(start:number){
    let result =0;
    for (let listReviewElement of this.listReview) {
      if(listReviewElement.rate==start){
        result+=1;
      }
    }
    return result;
  }
  returnArray(ia:any){
    let result:any=[];
    for (let i = 0; i < ia; i++) {
      result.push(i);
    }
    return result;
  }
  Ratio(start:any){
    return Math.round( (this.loadStart(start)/this.listReview.length)*100* 100)/ 100
  }
  avgStart(h:any){
    let a=  (this.loadStart(5)*5+this.loadStart(4)*4+this.loadStart(3)*3+
      this.loadStart(2)*2+this.loadStart(1)*1)/(this.listReview.length);
    return a.toFixed(h);
  }
  alert(mess:any,type:any) {
    Swal.fire({
      position: 'top',
      icon: type,
      title: mess,
      showConfirmButton: false,
      timer: 1500
    })
    location.reload();
  }

  hideReview() {
    this.listRview2Item=[];
    this.loadReview();
    // @ts-ignore
    document.getElementById('btnHide').style.display = 'none'
    // @ts-ignore
    document.getElementById('btnShow').style.display = 'inline'
  }
}
