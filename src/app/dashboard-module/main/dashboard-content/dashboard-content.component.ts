import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent {
  constructor(public dashService:DashService){
    dashService.activeComponent = 'dashboard';
    dashService.headerContent = '';

  }


}
