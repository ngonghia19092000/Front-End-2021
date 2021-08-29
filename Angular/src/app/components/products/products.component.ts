import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {CategoryfilterPipe} from "../../services/filter/categoryfilter.pipe";
import value from "*.json";
import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart.service";
import {listProducts} from "../../models/listproduct";
import {CartItem} from "../../models/cart-item";
import {UserService} from "../../services/user.service";
import {CheckoutService} from "../../services/checkout.service";
import Swal from "sweetalert2";
import {ReviewService} from "../../services/review.service";
import {Review} from "../../models/review";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  searchedKeyword: string = "";
  totalLength: any;
  page: number = 1;
  @Input() productAddtoCart: Product | any;
  listReview: Review | any = [];
  arrayStar: any = [];

  constructor(private productService: ProductService,
              private userservice: UserService,
              private cartService: CartService,
              private checkoutservice: CheckoutService,
              private reviewService: ReviewService) {
  }

  pricefill: number = 0;
  categoryfill: string = "";
  cartItem: CartItem[] = [];

  ngOnInit() {
    this.getAllProduct();
    this.update();
    this.getCart();
    this.loadCartItems();
    this.loadReview();
  }

  getAllProduct() {
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    });
  }

  update() {
    setInterval(() => {
      if (this.categoryfill != '') {
        this.totalLength = CategoryfilterPipe.length;
      } else {
        this.totalLength = this.productList.length;
      }

    });
  }

  getCart() {
    this.cartService.getUserName();
    this.cartService.getAllCartItems(this.cartService.getUserName()).subscribe((t) => {
      this.cartItem = t;
    })
  }

  sortByPriceT() {
    console.log('sort');
    this.productList.sort((a, b) => {
      // @ts-ignore
      if (a.pricesale < b.pricesale) {
        return 1;
      }
      // @ts-ignore
      if (a.pricesale > b.pricesale) {
        return -1;
      }
      return 0
    });
  }

  sortByPriceG() {
    console.log('sort');
    this.productList.sort((a, b) => {
      // @ts-ignore
      if (a.pricesale > b.pricesale) {
        return 1;
      }
      // @ts-ignore
      if (a.pricesale < b.pricesale) {
        return -1;
      }
      return 0
    });
  }

  public add(id: number) {
    this.getCart();
    if (this.cartService.getUserName() != '') {
      this.AddToCart(id);
      console.log('login.....');
    } else {
      console.log('unlogin.....');
      let it: any;
      for (let i of this.productList) {
        if (i.id == id) {
          it = new CartItem(i, 1, '');
        }
      }
      this.cartService.addToCart(it);

    }
    this.alert('Đã thêm sản phẩm vào giỏ', 'success')
  }

  alert(mess: any, type: any) {
    Swal.fire({
      position: 'top',
      icon: type,
      title: mess,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public AddToCart(productid: number) {
    let it: any;
    let check = false;
    for (let i of this.productList) {
      if (i.id == productid) {
        it = new CartItem(i, 1, this.cartService.getUserName());

      }
    }

    for (let item of this.cartItem) {
      if (productid == item.product.id) {
        it = item;
        this.cartService.updateQtyOfCartItem(it).subscribe();
        this.getCart();
        check = true;
        break;
      }
    }

    if (check == false) {
      this.cartService.addProductToCart(it).subscribe(() => console.log(it.product.productname));
      this.getCart();
      this.cartService.addListCart(this.cartItem)

    }
  }


  buynow(id: any) {
    for (let productListElement of this.productList) {
      if (id == productListElement.id) {
        let item = new CartItem(productListElement, 1, this.getUserName());
        let array = [];
        array.push(item)
        this.checkoutservice.addListCartToOrder(array)
      }
    }

  }

  getUserName() {
    if (this.userservice.userValue) {
      return this.userservice.userValue.username;
    } else
      return '';
  }

  loadCartItems() {
    // return this.cartItems = this.cartService.getCart();
    if (this.userservice.userValue) {
      this.cartService.getAllCartItems(this.userservice.userValue.username).subscribe((up) => {
        this.cartItem = up
        this.cartService.addListCart(this.cartItem);
      });
    } else {
      this.cartItem = this.cartService.getItemsOff();
      this.cartService.addListCart(this.cartItem);
    }

  }

  returnArray(avgStart: any) {
    let result: any = [];
    for (let i = 0; i < avgStart; i++) {
      result.push(i);
    }
    return result;

  }

  avgStart(number: number,product:any) {
    let array=this.findProduct(product);
      let a = (this.loadStart(5,array) * 5 + this.loadStart(4,array) * 4 + this.loadStart(3,array) * 3 +
        this.loadStart(2,array) * 2 + this.loadStart(1,array) * 1) / (array.length);
      return a.toFixed(number);



  }

  findProduct(productid:any){
    let arr:any=[];
    for (let listReviewElement of this.listReview) {
      if(listReviewElement.product_id==productid){
        arr.push(listReviewElement);
        break;
        return arr;
      }
    }
    return arr;
  }
  loadStart(start: number,array:any) {
    let result = 0;
    for (let listReviewElement of array) {
      if (listReviewElement.rate == start) {
        result += 1;
      }
    }
    return result;
  }

  loadReview() {
  this.reviewService.getAllReviewProduct().subscribe((data) => {
   this.listReview=data;
  })
  }
}
