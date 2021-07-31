
export class User {
  id:number;
  username:string;
  email:string;
  fullname:string
  password:string;
  phone:string;
  adress:string;


  constructor(id: number, username: string, email: string, fullname: string, password: string, phone: string, adress: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.password = password;
    this.phone = phone;
    this.adress = adress;
  }
}
