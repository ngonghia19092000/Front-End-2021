import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {RouterLink} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User | undefined;
  constructor(private userApi:UserService) {
    this.user = this.userApi.userValue;
  }

  ngOnInit(): void {
  }
  searchProduct(product:string){

  }
  logout() {
    this.userApi.logout();
    window.location.reload();
  }

}
