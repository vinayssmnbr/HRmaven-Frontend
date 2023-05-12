import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todayattendance'
})
export class TodayattendancePipe implements PipeTransform {

  transform(value: any): any {
    const date = new Date();
    const month = date.getMonth();
    let filter=[];
    for(let i=0;i<value.length;i++)
    {
        let m = new Date(value[i].appliedOn);
        let d =  m.getMonth();
        if(d==month)
        {
              filter.push(value[i]);
        }
    }
    if(filter.length==0)
    {
      filter.push('nofound');
      return filter;
    }
    console.log(filter);
    return filter;
  }

}
