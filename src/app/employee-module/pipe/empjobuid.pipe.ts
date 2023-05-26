import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empjobuid',
})
export class EmpjobuidPipe implements PipeTransform {
  filterjobuid: any[];
  transform(candidate: any[], Filteruid: string): any[] {
    if (!candidate || !Filteruid) {
      return candidate;
    }

    const filterjobuid = candidate.filter((item) => {
      const uid = item.uid.toString().toLowerCase();
      return uid.includes(Filteruid.toLowerCase());
    });

    if (filterjobuid.length === 0) {
      filterjobuid.push({ found: 'true' });
    }
    console.log('filter', filterjobuid);
    return filterjobuid;
  }
}
