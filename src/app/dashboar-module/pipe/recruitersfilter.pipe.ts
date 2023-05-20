import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recruitersfilter'
})
export class RecruitersfilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
