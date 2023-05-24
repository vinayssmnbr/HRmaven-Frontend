import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'candidatefilter'
})
export class CandidatefilterPipe implements PipeTransform {

  transform(value: any, name: any, designation: any): any {
    console.log(designation);
    console.log(name);
    if (name == "") {
      if (designation == 'Designation' || designation=='All') {
        return value;
      }
      else {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].designation.toLowerCase().startsWith(designation.toLowerCase())) {
            filteredArray.push(value[i]);
          }
        }
        if(filteredArray.length==0){
          filteredArray.push({found:"true"});
         }

        return filteredArray;
      }
    }
    else {
      if (designation == 'Designation' || designation=='All') {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].name.toLowerCase().startsWith(name.toLowerCase()) || value[i].uid.toString().toLowerCase().startsWith(name.toLowerCase())) {
            filteredArray.push(value[i]);
          }
        }
        if(filteredArray.length==0){
          filteredArray.push({found:"true"});
         }

        return filteredArray;
      } else {
        const filteredArray = [];
        for (let i = 0; i < value.length; i++) {
          if ((value[i].name.toLowerCase().startsWith(name.toLowerCase()) || value[i].uid.toString().toLowerCase().startsWith(name.toLowerCase())) && value[i].designation.toLowerCase() == designation.toLowerCase()) {
            filteredArray.push(value[i]);
          }
        }
        if(filteredArray.length==0){
          filteredArray.push({found:"true"});
         }

        return filteredArray;
      }
    }
  }
}
