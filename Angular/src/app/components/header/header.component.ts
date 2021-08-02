import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: User | undefined;
  usernamee:any  ='';
  constructor(private userApi:UserService,
              private router:Router) {
    this.user = this.userApi.userValue;

  }

  ngOnInit(): void {
  }
  searchProduct(product:string){

  }
  logout() {
    this.userApi.logout();
    window.location.reload()
    this.router.navigate(['/'])
  }

  // checkRole() {
  //   const md5 = new Md5();
  //   var encr= md5.appendAsciiStr(<string>this.user?.username).end();
  //   // const encr =this.md5.appendAsciiStr(<string>this.user?.username).end();
  //   if(this.user!== null&&this.router.navigate(['my-account/'+this.user?.username+''])){
  //     this.router.navigate(['my-account/'+encr+''])
  //   }else {
  //     this.router.navigate(['login'])
  //   }
  // }
 name(){
 return this.usernamee= this.userApi.encryptMd5(<string>this.user?.username);
 }
}
