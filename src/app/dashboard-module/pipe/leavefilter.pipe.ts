import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leavefilter'
})
export class LeavefilterPipe implements PipeTransform {

  transform(value: any,name:any,status:any): any {
    if (status=="Select" || status=="All") {
      console.log(typeof (name));
      if (name == '') {
        return value;
      }
      else {
        const Array = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].employeeId.startsWith(name) || value[i].employeeName.startsWith(name)) {
            Array.push(value[i]);
          }
        }

        return Array;
      }

    }
    else{
      if(status=="All") {
        const Array = [];
        for (let i = 0; i < value.length; i++) {
            Array.push(value[i]);
        }
        return Array;
      }
      else if(status=="Pending") {
        const Array = [];
        for (let i = 0; i < value.length; i++) {
          if(value[i].status=="pending")
            Array.push(value[i]);
        }
        return Array;
      }
      else if(status=="Accepted") {
        const Array = [];
        for (let i = 0; i < value.length; i++) {
          if(value[i].status=="accept")
            Array.push(value[i]);
        }
        return Array;
      }
      else{
        const Array = [];
        for (let i = 0; i < value.length; i++) {
          if(value[i].status=="reject")
            Array.push(value[i]);
        }
        return Array;
      }


    }


  }

}
