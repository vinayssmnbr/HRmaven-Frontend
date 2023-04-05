import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css']
})
export class LeavesContentComponent {
  constructor(private dashService:DashService){
    dashService.activeComponent = 'leaves';
    dashService.headerContent = '';
  }


}
