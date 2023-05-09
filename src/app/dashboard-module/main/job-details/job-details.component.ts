import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent {
  constructor(private dashService: DashService) {
    dashService.activeComponent = 'job-details';
    dashService.headerContent = '';
  }

  id: any = 'all';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }
  designationdropdownOption: boolean = false;

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }

  array: any = [
    {
      id: 0,
      name: 'Shortlisted',
    },
    {
      id: 1,
      name: 'Hired',
    },
    {
      id: 2,
      name: 'Interview',
    },
    {
      id: 3,
      name: 'Rejected',
    },
    {
      id: 4,
      name: 'Archive',
    },
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.colorvariable = arr.id;
    console.log(arr.name);
  }

  Jobdetails: boolean = false;
  viewbtn(){
    this.Jobdetails = true;
  }
  close_modal(){
    this.Jobdetails = false;
  }
}
