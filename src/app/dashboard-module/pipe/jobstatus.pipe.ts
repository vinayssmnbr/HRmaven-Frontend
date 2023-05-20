import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobstatus',
})
export class JobstatusPipe implements PipeTransform {
  filteredJobRecord: any[];
  transform(jobrecord: any[], statusFilter: string): any {
    if (!statusFilter || statusFilter === 'all') {
      console.log('xy', jobrecord);
      if (!jobrecord || jobrecord.length === 0) {
        return [{ found: 'true' }];
      }

      return jobrecord;
    }
    const filteredJobRecord = jobrecord.filter(
      (employee) => employee.status === statusFilter
    );

    if (filteredJobRecord.length === 0) {
      filteredJobRecord.push({ found: 'true' });
    }
    console.log('filter', filteredJobRecord);
    return filteredJobRecord;
  }
}
