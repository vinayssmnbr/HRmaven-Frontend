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
      name: 'Software Developer',
    },
    {
      id: 1,
      name: 'Frontend Developer',
    },
    {
      id: 3,
      name: 'Full Stack Developer',
    },
    {
      id: 4,
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
  designationdropdownOption: boolean = false;

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }
}
