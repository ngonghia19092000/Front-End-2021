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
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PricefilterPipe } from './services/filter/pricefilter.pipe';
import { CategoryfilterPipe } from './services/filter/categoryfilter.pipe';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



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
    path:"my-account/:username",
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
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"**",
    component:PageNotFoundComponent
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
    PricefilterPipe,
    CategoryfilterPipe,
    RegisterComponent,
    PageNotFoundComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
