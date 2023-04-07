import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-recruitment-content',
  templateUrl: './recruitment-content.component.html',
  styleUrls: ['./recruitment-content.component.css']
})
export class RecruitmentContentComponent {
  constructor(private dashService:DashService){
    dashService.activeComponent = 'recruitment';
    dashService.headerContent = '';
  }


}
