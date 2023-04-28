import { Component } from '@angular/core';
import { EmpService } from '../../shared/emp.service';
@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css'],
})
export class LeavesContentComponent {
  constructor(public empService:EmpService){
    empService.activeComponent = 'leave';
    empService.headerContent = '';

  }

  ngOnIt() {}

  array: any = [
    {
      id: 0,
      name: 'Casual leave',
    },
    {
      id: 1,
      name: 'Medical Leave',
    },
    {
      id: 2,
      name: 'Urgent Leave',
    },
    {
      id: 3,
      name: 'Earned Leave',
    },
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
  }
  leaveshistory = false;
  employeemaintable = true;
  tablehistory() {
    this.leaveshistory = true;
    this.employeemaintable = false;
  }
  employee_leaves() {
    this.leaveshistory = false;
    this.employeemaintable = true;
  }

  // ---------Modal popoup----------
  leave_approved_form = false;
  applyleaves() {
    this.leave_approved_form = true;
  }
  closemodal(){
    this.leave_approved_form = false;
  }
  designationdropdownOption: boolean = false;

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }

}
