import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-payroll-content',
  templateUrl: './payroll-content.component.html',
  styleUrls: ['./payroll-content.component.css']
})
export class PayrollContentComponent {
  constructor(private dashService:DashService){
    dashService.activeComponent = 'payroll';
    dashService.headerContent = '';
  }

}
