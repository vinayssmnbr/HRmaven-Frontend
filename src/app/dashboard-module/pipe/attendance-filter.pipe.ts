import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attendanceFilter'
})
export class AttendanceFilterPipe implements PipeTransform {

  transform(value: any,name:any,id:any): any {
    if(name=="" && id=="")
    {
        return value;
    }
    else if(name=="" && id!="")
    {
      const Array=[];
      for(let i=0;i<value.length;i++)
      {
            console.log(value[i]);
            if((value[i].empId).startsWith(id))
            {
              Array.push(value[i]);
            }
      }
      return Array;
    }
    else if(name!="" && id=="") {
      const Array=[];
      for(let i=0;i<value.length;i++)
      {
            console.log(value[i]);
            if((value[i].name).startsWith(name))//value[i].name==name
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
            if((value[i].empId).startsWith(id) && (value[i].name).startsWith(name) )
            {
              Array.push(value[i]);
            }
      }
      return Array;
    }
  }

}
