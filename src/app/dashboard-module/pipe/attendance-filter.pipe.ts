import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attendanceFilter',
})
export class AttendanceFilterPipe implements PipeTransform {
  transform(value: any, name: any): any {
    if (name == '') {
      return value;
    } else {
      const filteredArray = [];
      for (let i = 0; i < value.length; i++) {
        if (
          value[i].name.toLowerCase().startsWith(name.toLowerCase()) ||
          value[i].uid.toString().toLowerCase().startsWith(name.toLowerCase())
        ) {
          filteredArray.push(value[i]);
        }
      }
      if (filteredArray.length == 0) {
        filteredArray.push({ found: 'true' });
      }

      return filteredArray;
    }
  }
}
