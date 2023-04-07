import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-employee-content',
  templateUrl: './employee-content.component.html',
  styleUrls: ['./employee-content.component.css']
})
export class EmployeeContentComponent implements OnInit {
  employeeForm: FormGroup;


  employeeId: any = 211; 

  employeeData: any[] = [];

  employeeEmail: any ='';

  employeeID: any ='';

  constructor( public dashService:DashService){
    dashService.activeComponent = 'employees';
    dashService.headerContent = '';
  }

  ngOnInit() {
   this.employeeForm = new FormGroup({
      employeeId: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required)
    });

    

  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



}
