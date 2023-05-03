import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeestatus',
})
export class FilterByStatusPipe implements PipeTransform {
  filteredEmployee: any[];
  transform(employee:any[], statusFilter: string):any {
    if (!statusFilter || statusFilter === 'all') {
      return employee;
    }
  const filteredEmployee=employee.filter(employee => employee.status === statusFilter);

    if(filteredEmployee.length===0){
      filteredEmployee.push({found:'true'})
    }
    return filteredEmployee
  }

}
