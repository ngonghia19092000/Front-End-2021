import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, status:string): any {
    if(status == ''){
      return value;
    }
    const order:any[]  = [];
    for (let i = 0 ; i<value.length;i++){
        let sts = value[i].status;
        if(status == sts){
          order.push(value[i]);
        }
    }
  return order;
  }
}
