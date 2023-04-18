import { LowerCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeefilter'
})
export class EmployeefilterPipe implements PipeTransform {

  transform(value: any, name: any, designation: any): any {
    if (name == "") {
      if (designation == 'Designation' || 'All') {
        return value;
      }
      else {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].designation.toLowerCase() == designation.toLowerCase()) {
            filteredArray.push(value[i]);
          }
        }
        return filteredArray;
      }
    }
    else {
      if (designation == 'Designation' || 'All') {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].name.toLowerCase().startsWith(name.toLowerCase()) || value[i].uid.toString().toLowerCase().startsWith(name.toLowerCase())) {
            filteredArray.push(value[i]);
          }
        }
        return filteredArray;
      } else {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].name.toLowerCase().startsWith(name.toLowerCase()) || value[i].uid.toString().toLowerCase().startsWith(name.toLowerCase()) && value[i].designation.toLowerCase() == designation.toLowerCase()) {
            filteredArray.push(value[i]);
          }
        }
        return filteredArray;
      }
    }
  }
}
