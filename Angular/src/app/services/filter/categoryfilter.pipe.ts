import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryfilter'
})
export class CategoryfilterPipe implements PipeTransform {

  transform(value: any,catego:string): any {
    if(catego == ""){
      return value;
    }
      const arrCategory:any[]=[];
    for (let i = 0; i <value.length ; i++) {
      let cate:string = value[i].category;
      if(catego == cate)
        arrCategory.push(value[i]);
      }

    return arrCategory;
    }

}
