export class Discount {
  codeDiscount:string;
  rate:number;

  constructor(codeDiscount:string,rate:number) {
    this.codeDiscount =codeDiscount;
    this.rate = rate;
  }
}
