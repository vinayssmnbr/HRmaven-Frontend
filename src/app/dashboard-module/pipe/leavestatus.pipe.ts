import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leavestatus',
  pure:false
})
export class LeavestatusPipe implements PipeTransform {

  transform(value: any,status:any): any {
    var filter=[];
    value.map((d:any)=>{
      if(d.status==status)
      {
        filter.push(d);
      }
    })
    if(filter.length==0)
    {
      filter.push('nofound');
      return filter;
    }
    return filter;
  }

}
