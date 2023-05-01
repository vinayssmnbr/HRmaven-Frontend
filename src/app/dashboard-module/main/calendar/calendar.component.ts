import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  constructor(
  public dashService: DashService){
    dashService.activeComponent = 'calendar';

  }
  ngOnInit(){

  }
}
