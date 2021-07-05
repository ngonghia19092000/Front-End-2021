import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import { ContactComponent } from './components/contact/contact.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { LoginComponent } from './components/login/login.component';
// import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';



const appRoutes : Routes =[
  {
    path: "",
    component : HomeComponent
  },
  {
    path: "contact",
    component:ContactComponent
  },
  {
    path:"productdetail/:id",
    component:ProductdetailComponent
  },{
  path:"products",
    component:ProductsComponent
  }
  ,
  {
    path:"my-account",
    component:MyAccountComponent
  },
  {
    path:"cart",
    component:CartComponent
  }
  ,
  {
    path:"login",
    component:LoginComponent
  },




]



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    ProductdetailComponent,
    ProductsComponent,
    CartComponent,
    MyAccountComponent,
    LoginComponent,
    // CartItemComponent,
    ProductItemComponent,
    CartItemComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
