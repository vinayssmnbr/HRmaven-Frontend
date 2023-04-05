import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-report-content',
  templateUrl: './report-content.component.html',
  styleUrls: ['./report-content.component.css']
})
export class ReportContentComponent {
  constructor(private dashService:DashService){
    dashService.activeComponent = 'report';
    dashService.headerContent = '';
  }


}
