import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeestatus',
})
export class EmpstatusPipe implements PipeTransform {
  filteredEmployee: any[];
  transform(employee: any[], statusFilter: string): any {
    if (!statusFilter || statusFilter === 'all') {
      console.log('xy', employee);
      if (!employee || employee.length === 0) {
        return [{ found: 'true' }];
      }

      return employee;
    }
    const filteredEmployee = employee.filter(
      (employee) => employee.status === statusFilter
    );

    if (filteredEmployee.length === 0) {
      filteredEmployee.push({ found: 'true' });
    }
    console.log('filter', filteredEmployee);
    return filteredEmployee;
  }
}
