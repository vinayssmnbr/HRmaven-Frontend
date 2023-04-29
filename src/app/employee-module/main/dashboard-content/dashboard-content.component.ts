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

  array: any = [
    {
      id: 0,
      name: 'January',
    },
    {
      id: 1,
      name: 'February',
    },
    {
      id: 2,
      name: 'March',
    },
    {
      id: 3,
      name: 'April',
    },
    {
      id: 4,
      name: 'May',
    },
    {
      id: 5,
      name: 'June',
    },
    {
      id: 6,
      name: 'July',
    },
    {
      id: 7,
      name: 'UI/UX Designer',
    },
    {
      id: 8,
      name: 'UI/UX Designer',
    },
    {
      id: 9,
      name: 'UI/UX Designer',
    },
    {
      id: 10,
      name: 'UI/UX Designer',
    },
    {
      id: 11,
      name: 'UI/UX Designer',
    },
    {
      id: 12,
      name: 'UI/UX Designer',
    },
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {
  
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Designation';
  colorvariable: number =  0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown=false;
    console.log(arr.name);
  }
  
}

