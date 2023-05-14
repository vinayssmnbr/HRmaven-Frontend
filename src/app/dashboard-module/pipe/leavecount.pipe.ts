import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leavecount',
  pure:false
})
export class LeavecountPipe implements PipeTransform {

  transform(value:any):any {
    var total=0;
    var filter= [ {
      total:0,
      count:0,
      name:'Total Leaves'
    },
    {
      total:0,
      count:0,
      name:' Pending Leaves'
    },
    {
      total:0,
      count:0,
      name:'Accept Leaves'
    },
    {
      total:0,
      count:0,
      name:'Rejected Leaves'
    }
  ]

  value.map((item:any)=>{
    if(item.status=='pending')
    {
      filter[1].count++;
      total=total+1;
    }
    else if(item.status=='reject')
    {
      filter[3].count++;
      total=total+1;
    }
    else if(item.status=='accept')
    {
      filter[2].count++;
      total=total+1;
    }
  })

    filter[0].count=total;
    filter[0].total=total;
    filter[1].total=total;
    filter[2].total=total;
    filter[3].total=total;
    // console.log(filter);
    return filter;

  }

}
