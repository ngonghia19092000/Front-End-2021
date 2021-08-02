import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user:User|any;
  is_edit: boolean=true;
  constructor( private userService:UserService,
               private router:Router,
               private activRouter:ActivatedRoute) {
    this.user=userService.userValue;

  }

  ngOnInit(): void {

  }
  logout(){
    this.userService.logout();
    this.router.navigate(['/'])
  }
  updateInfo() {
    this.is_edit = false;
// @ts-ignore
    document.getElementById('btnUpd').style.display = 'none'

    // @ts-ignore
    document.getElementById('btnExit').style.display = 'inline'
    // @ts-ignore
    document.getElementById('btn-updateaccount').style.display = 'inline'
  }
  back(){
    this.is_edit=true;
    // @ts-ignore
    document.getElementById('btnUpd').style.display='inline'

    // @ts-ignore
    document.getElementById('btnExit').style.display='none'
    // @ts-ignore
    document.getElementById('btn-updateaccount').style.display='none'

  }

  updateAccount() {

  }

}
