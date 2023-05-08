import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {

  constructor(private dashService:DashService){
    dashService.activeComponent = 'job-details';
    dashService.headerContent = '';
  }

  id: any = 'all';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }




  
}