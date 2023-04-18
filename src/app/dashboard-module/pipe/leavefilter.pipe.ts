import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leavefilter'
})
export class LeavefilterPipe implements PipeTransform {

  transform(value: any, name: any, status: any): any {
    if (status == "Select" || status == "All") {
      if (name == '') {
        return value;
      } else {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].employeeId.toLowerCase().startsWith(name.toLowerCase()) || value[i].employeeName.toLowerCase().startsWith(name.toLowerCase())) {
            filteredArray.push(value[i]);
          }
        }

        return filteredArray;
      }

    } else {
      if (status == "All") {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          filteredArray.push(value[i]);
        }
        return filteredArray;
      } else if (status == "Pending") {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].status.toLowerCase() == "pending") {
            filteredArray.push(value[i]);
          }
        }
        return filteredArray;
      } else if (status == "Accepted") {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].status.toLowerCase() == "accept") {
            filteredArray.push(value[i]);
          }
        }
        return filteredArray;
      } else {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].status.toLowerCase() == "reject") {
            filteredArray.push(value[i]);
          }
        }
        return filteredArray;
      }
    }
  }
}
