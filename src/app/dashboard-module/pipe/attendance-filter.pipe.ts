import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attendanceFilter'
})
export class AttendanceFilterPipe implements PipeTransform {

  transform(value: any, name: any, date: any): any {
    if (date=="") {
      console.log(typeof (name));
      if (name == '') {
        return value;
      }
      else {
        const Array = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].name.startsWith(name) || value[i].empId.toString().startsWith(name)) {
            Array.push(value[i]);
          }
        }

        return Array;
      }

    }
    else{
      // console.log(date);
      // console.log(typeof (date));
      const Array = [];
      for (let i = 0; i < value.length; i++) {

        var newdate = new Date(value[i].date);
        var hello = newdate.toISOString().substring(0, 10);
        if (hello == date) {
          Array.push(value[i]);
        }

      }
      return Array;
    }

  }
}
