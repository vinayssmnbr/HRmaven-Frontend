import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empjobstatus',
})
export class EmpjobstatusPipe implements PipeTransform {
  filteredJobRecord: any[];
  transform(candidate: any[], statusFilter: string): any {
    if (!statusFilter || statusFilter === 'All') {
      console.log('xy', candidate);
      if (!candidate || candidate.length === 0) {
        return [{ found: 'true' }];
      }

      return candidate;
    }
    const filteredJobRecord = candidate.filter(
      (employee) => employee.status === statusFilter
    );

    if (filteredJobRecord.length === 0) {
      filteredJobRecord.push({ found: 'true' });
    }
    console.log('filter', filteredJobRecord);
    return filteredJobRecord;
  }
}
