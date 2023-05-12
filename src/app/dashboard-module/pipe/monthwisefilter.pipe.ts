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
    if(filter.length==0)
    {
      filter.push(0);
      return filter;
    }
    return filter;
  }

}
