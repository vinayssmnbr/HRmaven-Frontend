import { Component } from '@angular/core';
import { EmpService } from '../../shared/emp.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  constructor(public empService:EmpService){
    empService.activeComponent = 'calendar';
    empService.headerContent = '';

  }
  ngOnInit(): void {


  }
}
