import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {
  isJobDetailsActive = false;
  isPersonalDetailsActive = true;
  personaldetail:boolean=true;
  jobdetail:boolean=false;
  personaldetails() {
    this.personaldetail = true;
    this.jobdetail = false;
    this.isPersonalDetailsActive = true;
    this.isJobDetailsActive = false;
  }
  jobdetails() {
    this.jobdetail = true;
    this.personaldetail = false;
    this.isJobDetailsActive = true;
    this.isPersonalDetailsActive = false;
  }


}
