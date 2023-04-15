import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attendanceFilter'
})
export class AttendanceFilterPipe implements PipeTransform {

  transform(value: any,name:any): any {

    if(name.length=="")
    {
        return value;
    }

    else{
      const Array=[];
      for(let i=0;i<value.length;i++)
      {
            console.log(value[i]);
            if(((value[i].empId || value[i].employeeId ).startsWith(name)) || ((value[i].name || value[i].employeeName).startsWith(name)))
            {
              Array.push(value[i]);
            }
      }
      return Array;
    }
  }

}
