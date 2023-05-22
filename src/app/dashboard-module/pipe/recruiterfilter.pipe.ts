import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recruiterfilter'
})
export class RecruiterfilterPipe implements PipeTransform {

  transform(value:any,email:any):any {

    if(value!=undefined)
    {
        if(email=='')
        {
          return value;
        }
        else{
          var filter = value.filter((item:any)=>{
            console.log(item.professionalemail);
              return item.professionalemail.startsWith(email.toLowerCase());
          })
          console.log(filter);
          return filter;
        }
    }
  }

}
