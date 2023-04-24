import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../shared/emp.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit{

  constructor(public empService:EmpService){
    empService.activeComponent = 'attendance';
    empService.headerContent = '';

  }
  ngOnInit(): void {

  }


}
