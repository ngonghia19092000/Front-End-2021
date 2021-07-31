import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {ControlValueAccessor, Form, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public listUsers: User[] = [];
  model: any = {};
message:string='';
  form: FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: string | any;
  public user: Observable<User> | any;
  private userSubject: BehaviorSubject<User> | any;


  constructor(private list: UserService,
              private route: ActivatedRoute,
              private api: UserService,
              private router: Router) {
    this.getUser();
    // redirect to home if already logged in
    if (this.api.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getUser() {
    this.api.getAllUser()
      .subscribe((data) => {
          this.listUsers = data
        }
      )
  }

  loginAccount() {
    for (var i = 0; i < this.listUsers.length; i++) {
      if (this.model.userName === this.listUsers[i].username||this.listUsers.length==0) {
        if (this.model.password === this.listUsers[i].password) {
          this.api.addDataLocalStorage(this.listUsers[i])
          this.router.navigate([this.returnUrl]);
          window.location.reload();
          break
        } else {
         this.message=('Tài khoản hoặc mật khẩu không chính xác');
        }
      } else
       this.message='Tài khoản không tồn tại'
    }


  }

}
