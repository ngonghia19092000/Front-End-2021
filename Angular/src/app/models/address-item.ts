export class AddressItem {
  id: number;
  name: string;
  province: string;
  districts: string;
  wards: string;
  addressDetails: string;
  phonenumber: number;

  constructor(id: number, name: string, province: string, districts: string, wards: string, phonenumber: number, addressDetails: string) {
    this.id = id;
    this.name = name;
    this.province = province;
    this.districts = districts;
    this.wards = wards;
    this.phonenumber = phonenumber;
    this.addressDetails = addressDetails;
  }



}
