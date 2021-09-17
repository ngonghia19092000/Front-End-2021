import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ReviewService} from "../../services/review.service";
import {Review} from "../../models/review";
import {Product} from "../../models/product";
import value from "*.json";
import {CartItem} from "../../models/cart-item";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout.service";
import Swal from "sweetalert2";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listReview: Review | any = []
  listIdReview: any = [];
  listProduct: any = [];
  user: User | any;
  cartItem: CartItem | any = [];

  constructor(private product: ProductService,
              private reviewSer: ReviewService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private userService: UserService) {

  }

  ngOnInit(){
    this.loadRview();
    this.getCart();
  }


  listproduct1: Product | any = [];
  listproduct2: Product | any = [];
  listproduct3: Product | any = []

//load sản phẩm nổi bật
  loadRview() {
    var arr1: any = [], arr2: any = [], prev: any, listProduct: any = [];
    this.reviewSer.getAllReviewProduct().subscribe((data) => {
      this.listReview = data;
      for (let listReviewElement of this.listReview) {
        this.listIdReview.push(listReviewElement.product_id);
      }
      this.listIdReview.sort();
      for (var i = 0; i < this.listIdReview.length; i++) {
        if (this.listIdReview[i] !== prev) {
          arr1.push(this.listIdReview[i]);
          arr2.push(1);
        } else {
          arr2[arr2.length - 1]++;
        }
        prev = this.listIdReview[i];
      }
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (i == j) {
            let map = {product: [], rate: 0};
            let arr: any = [];
            map.product = (this.findProduct(arr1[i]));
            map.rate = arr2[j]
            listProduct.push(map);

          }
        }
      }
      // sort theo value
      listProduct.sort(function (a: any, b: any) {
        return b.rate - a.rate;
      });
      this.listProduct = listProduct;
      //tab 1
      for (let i = 0; i < 4; i++) {
        this.listproduct1.push(listProduct[i]);
      }
      // tab 2
      for (let i = 4; i < 8; i++) {
        this.listproduct2.push(listProduct[i]);
      }
      // tab 3
      for (let i = 8; i < 12; i++) {
        this.listproduct3.push(listProduct[i]);
      }
    })

  }

// tìm sản phẩm với id
  findProduct(id: any) {
    let a: any;
    this.product.getProductById(id).subscribe(data => {
      a = data;
    })
    return a;
  }


  returnArray(avgStart: any) {
    let result: any = [];
    for (let i = 0; i < avgStart; i++) {
      result.push(i);
    }
    return result;

  }

  //tìm sản review của sản phẩm với id
  findProduct1(productid: any) {
    let arr: any = [];
    for (let listReviewElement of this.listReview) {
      if (listReviewElement.product_id == productid) {
        arr.push(listReviewElement);
        break;
        return arr;
      }
    }
    return arr;
  }

  avgStart(number: number, product: any) {
    let array = this.findProduct1(product);
    let a = (this.loadStart(5, array) * 5 + this.loadStart(4, array) * 4 + this.loadStart(3, array) * 3 +
      this.loadStart(2, array) * 2 + this.loadStart(1, array) * 1) / (array.length);
    return a.toFixed(number);
  }

  loadStart(start: number, array: any) {
    let result = 0;
    for (let listReviewElement of array) {
      if (listReviewElement.rate == start) {
        result += 1;
      }
    }
    return result;
  }

  public add(id: number) {
    console.log(id)
    this.getCart();
    if (this.cartService.getUserName() != '') {
      this.AddToCart(id);
      console.log('login.....');
    } else {
      console.log('unlogin.....');
      let it: any;
      for (let i of this.listProduct) {
        if (i.product.id == id) {
          it = new CartItem(i.product, 1, '');
        }
      }
      this.cartService.addToCart(it);

    }
    this.alert('Đã thêm sản phẩm vào giỏ', 'success')
  }

  getCart() {
    this.cartService.getUserName();
    this.cartService.getAllCartItems(this.cartService.getUserName()).subscribe((t) => {
      this.cartItem = t;
      this.cartService.addListCart(this.cartItem)
    })
  }

  buynow(id: any) {
    for (let productListElement of this.listProduct) {
      if (id == productListElement.product.id) {
        let item = new CartItem(productListElement.product, 1, this.cartService.getUserName());
        let array = [];
        array.push(item)
        this.checkoutService.addListCartToOrder(array)
      }
    }


  }

  getUser() {
    return this.cartService.getUserName();
  }

  alert(mess: any, type: any) {
    Swal.fire({
      position: 'center',
      icon: type,
      title: mess,
      showConfirmButton: false,
      timer: 1000
    })
  }


  public AddToCart(productid: number) {
    let it: any;
    let check = false;
    for (let i of this.listProduct) {
      if (i.product.id == productid) {
        it = new CartItem(i.product, 1, this.cartService.getUserName());

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

    }
  }
}
