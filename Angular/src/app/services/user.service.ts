import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {of} from "rxjs";
import {User} from "../models/user";
import {listUser} from "../models/listuser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
// lấy danh sách user từ file json
  getUser():Observable<User[]>{
    return of(listUser);
  }
//lấy user từ id
  getUserById(id:any):Observable<User| undefined>{
    return of(listUser.find(users => users.id == id));
  }
}
