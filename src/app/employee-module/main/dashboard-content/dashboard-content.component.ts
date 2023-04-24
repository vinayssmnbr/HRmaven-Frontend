import { Component } from '@angular/core';
import { EmpService } from '../../shared/emp.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent {
  constructor(private empService:EmpService){
    empService.activeComponent='dashboard';
    empService.headerContent='';

  }




}
