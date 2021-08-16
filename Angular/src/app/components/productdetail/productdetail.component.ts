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
  itemPro = {id: 0, product: [], qty: 0, userName: ''}

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private cartSer: CartService,
    private msg: MessengerService,
    private checkout: CheckoutService
  ) {

  }

  ngOnInit(): void {
    this.loadProductDetail();
    this.update();
    this.getAllCart()

  }

  update() {
    this.cartSer.getUserName();
    this.cartSer.getAllCartItems(this.cartSer.getUserName()).subscribe((up) => {
      this.cartItem = up
    });
  }

  loadProductDetail() {
    const proID = this.route.snapshot.paramMap.get('id');
    let id: any = proID;
    this.service.getProductById(id).subscribe(pro => this.product = pro);
    console.log(proID);
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
}
