export class Product {

  id:number;
  productname:string;
  img:string;
  pricesale:number
  price:number;
  description:string;
  manufacturer:string;
  listSize:[];


  constructor(id: number, productname: string, img: string, pricesale: number, price: number,
              description: string, manufacturer: string,listSize:Array<string>) {

    this.id = id;
    this.productname = productname;
    this.img = img;
    this.pricesale = pricesale;
    this.price = price;
    this.description = description;
    this.manufacturer = manufacturer;
    this.listSize = [];

  }
}

