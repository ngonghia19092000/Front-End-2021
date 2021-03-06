import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {productUrl, searchUser, userUrl} from "../../config/api";
import {User} from "../models/user";
import {Product} from "../models/product";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Md5} from "ts-md5";
import {Provinces} from "../models/provinces";
import {Districts} from "../models/districts";
import {Wards} from "../models/wards";
import {AddressItem} from "../models/address-item";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User> | any;
  public user: Observable<User> | any ;
  public login = false;

  constructor(private http:HttpClient,
              private router:Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('users')));
    this.user = this.userSubject.asObservable();
  }


  registerUser(user: any):Observable<any>{
    return this.http.post(userUrl,user)
  }



  public get userValue(): User {
    return <User>this.userSubject.getValue();
  }


  getUser(username:any):Observable<User> {
    return this.http.get<User>(searchUser  + username);

  }

  getAllUser():Observable<User[]>{
    return this.http.get<User[]>(userUrl)
  }

  addDataLocalStorage(user:any){
    localStorage.setItem('users', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('users');
    this.userSubject.next(null);
    this.login = false;
  }

  getById(id: string) {
    return this.http.get<User>(userUrl+'/users/'+id);
  }
  encryptMd5(code:string){
    const md5=new Md5();
    return md5.appendAsciiStr(code).end();
  }
  updateInfoAccount(data: any): Observable<any> {
    return this.http.put(userUrl + '/' + this.userValue.id + '?username=' + this.userValue.username,
      {
        email: data.email,
        phone: data.phone,
        address: data.address,
        username: this.userValue.username,
        id: this.userValue.id,
        password: this.userValue.password,
        fullname: this.userValue.fullname,
        listVoucher: this.userValue.listVoucher,
        shippingAddress: this.userValue.shippingAddress
      });

  }

  changePassword(data: any): Observable<any> {
    return this.http.put(userUrl + '/' + this.userValue.id + '?username=' + this.userValue.username,
      {
        email: this.userValue.email,
        phone: this.userValue.phone,
        address: this.userValue.adress,
        username: this.userValue.username,
        id: this.userValue.id,
        password: data,
        fullname: this.userValue.fullname,
        listVoucher: this.userValue.listVoucher,
        shippingAddress: this.userValue.shippingAddress
      });

  }
  putShippingAddress(data: any): Observable<any> {
    return this.http.put(userUrl + '/' + this.userValue.id + '?username=' + this.userValue.username,
      {
        email: this.userValue.email,
        phone: this.userValue.phone,
        address: this.userValue.adress,
        username: this.userValue.username,
        id: this.userValue.id,
        password: this.userValue.password,
        fullname: this.userValue.fullname,
        listVoucher: this.userValue.listVoucher,
        shippingAddress: data
      });
  }

  getProvince():Observable<Provinces[]>{
    return this.http.get<Provinces[]>('https://provinces.open-api.vn/api/p/')
  }
  getDistricts():Observable<Districts[]>{
    return  this.http.get<Districts[]>('https://provinces.open-api.vn/api/d/')
  }
  getWards():Observable<Wards[]>{
    return this.http.get<Wards[]>('https://provinces.open-api.vn/api/w/')
  }
  addNewAddress(data:AddressItem[]):Observable<any>{
    return this.http.put(userUrl + '/' + this.userValue.id + '?username=' + this.userValue.username,
      {
        email: this.userValue.email,
        phone: this.userValue.phone,
        address: this.userValue.adress,
        username: this.userValue.username,
        id: this.userValue.id,
        password: this.userValue.password,
        fullname: this.userValue.fullname,
        listVoucher: this.userValue.listVoucher,
        shippingAddress: data
      });

  }
}
