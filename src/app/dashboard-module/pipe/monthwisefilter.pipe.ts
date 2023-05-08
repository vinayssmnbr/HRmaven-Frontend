import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthwisefilter'
})
export class MonthwisefilterPipe implements PipeTransform {

  transform(value: any,month:any):any {
    var filter =[];
    value.map((item:any)=>{
    const d = new Date(item.date).getMonth();
    if(d==month){
      filter.push(item);
    }
    })

    return filter;
  }

}
