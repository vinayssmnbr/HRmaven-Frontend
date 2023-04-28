import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../shared/emp.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit{

  constructor(public empService:EmpService){
    empService.activeComponent = 'attendance';
    empService.headerContent = '';

  }
  ngOnInit(): void {


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
      name: 'August',
    },
    {
      id: 8,
      name: 'September',
    },
    {
      id: 9,
      name: 'October',
    },
    {
      id: 10,
      name: 'November',
    },
    {
      id: 11,
      name: 'December',
    }
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {
  
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Months';
  colorvariable: number =  0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown=false;
    console.log(arr.name);
  }
  designationdropdownOption: boolean = false;

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }
}
