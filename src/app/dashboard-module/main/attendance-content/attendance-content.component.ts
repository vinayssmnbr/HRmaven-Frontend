import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-attendance-content',
  templateUrl: './attendance-content.component.html',
  styleUrls: ['./attendance-content.component.css']
})
export class AttendanceContentComponent {
  constructor(private dashService:DashService){
    dashService.activeComponent = 'attendance';
    dashService.headerContent = '';
  }

}
