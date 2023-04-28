import { Component,OnInit } from '@angular/core';
import { EmpService } from '../../shared/emp.service';
@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent {

  constructor(public empService:EmpService){
    empService.activeComponent = 'recruitment';
    empService.headerContent = '';

  }
  ngOnInit(): void {


  }

}
