export class Address {
  apartment:string;
  street:string;
  wards:string;
  district:string;
  province:string;
  phoneaddress:string;

  constructor(apartment: string, street: string, wards: string, district: string, province: string,phoneaddress:string) {
    this.apartment = apartment;
    this.street = street;
    this.wards = wards;
    this.district = district;
    this.province = province;
    this.phoneaddress=phoneaddress;
  }
}
