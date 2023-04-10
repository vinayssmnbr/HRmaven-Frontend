import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value:any,id:any,designation:any): any {
    if(id=="" && designation=="Designation")
    {
      return value;
    }

    // if id is not present but designation present
    else if(id=="" && designation!="")
    {
      const Array=[];
      for(let i=0;i<value.length;i++)
      {
            console.log(value[i]);
            if(value[i].designation==designation)
            {
              Array.push(value[i]);
            }
      }
      return Array;
    }
    else if(id!="" && designation=="")
    {
      const Array=[];
      for(let i=0;i<value.length;i++)
      {
            console.log(value[i]);
            if(value[i].uid==id)
            {
              Array.push(value[i]);
            }
      }
      return Array;
    }
    else{
      const Array=[];
      for(let i=0;i<value.length;i++)
      {
            console.log(value[i]);
            if(value[i].uid==id && value[i].designation==designation)
            {
              Array.push(value[i]);
            }
      }
      return Array;
    }
  }

}
