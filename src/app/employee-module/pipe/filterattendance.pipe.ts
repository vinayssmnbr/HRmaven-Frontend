import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterattendance'
})
export class FilterattendancePipe implements PipeTransform {

  transform(value:any,month:any): any {
    console.log(month);
    let filter= new Array();
    if(!value)
    {
      value=[];
    }
    for(let i=0;i<value.length;i++)
    {
        let m = new Date(value[i].date);
        let d =  m.getMonth();
        if(d==month)
        {
              filter.push(value[i]);
        }
    }
    console.log(filter);
    return filter;
  }
  }

