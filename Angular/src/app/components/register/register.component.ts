import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
form:FormGroup|any;

  constructor(private formBuilder:FormBuilder,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:'',
      email:'',
      username:'',
      phone:'',
      password:'',
      address:'',

    });
  }

  submit():void {
console.log(this.form.getRawValue());
this.httpClient.post('src/app/data/user.json',this.form.getRawValue())
  }
}
