import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  constructor(public dashService: DashService) {
    dashService.activeComponent = 'calendar';
  }
  // progressBar: any;
  // progressText: any;
  // progress: number = 0;
  // interval: any;
  //  circularProgress: HTMLElement;
  // progressValue: HTMLElement;

  // progressStartValue: number = 0;
  // progressEndValue: number = 90;
  // speed: number = 100;
  meeting: any = [];
  ngOnInit() {
    this.fetchmeeting();
  }
  fetchmeeting() {
    this.dashService.fetchmeeting().subscribe((res: any) => {
      this.meeting = res.data[0].meeting;
      if (this.meeting.length > 0) {
        this.meeting.map((item: any) => {
          var x = new Date(item.start_time);
          var y = new Date(item.end_time);
          let seconds = Math.abs(x.getTime() - y.getTime()) / 1000;
          let min=seconds / 60;
          item['min']=min;
        })
      }
      console.log(this.meeting);
    }
    )

  }
}
