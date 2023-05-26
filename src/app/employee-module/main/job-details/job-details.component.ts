import { Component, Input } from '@angular/core';
import { DashService } from 'src/app/dashboard-module/shared/dash.service';
import { EmpService } from '../../shared/emp.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent {
  @Input() i: any;

  constructor(private dashService: EmpService) {
    dashService.activeComponent = 'job-details';
    dashService.headerContent = '';
  }

  ngOnInit() {
    this.i = this.dashService.getSelectedJobDetail();
    console.log('select1', this.i);
  }
  id: any = 'all';
  candidate: any = [];
  statusFilter: string = 'All';

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

  Jobdetails = false;
  moreview() {
    this.Jobdetails = true;
  }
  close_modal() {
    this.Jobdetails = false;
  }
  addcandidate: boolean = false;
  closemodal() {
    this.addcandidate = false;
  }
  openmodal() {
    this.addcandidate = true;
  }
  Newcandidate: boolean = false;
  openaddmodal() {
    this.Newcandidate = true;
    this.addcandidate = false;
  }
  closedone() {
    this.Newcandidate = false;
  }
  statusItem: string[] = [
    'All',
    'Resume Received',
    'Shortlisted',
    'Interview',
    'Hired',
    'Rejected',
    'Archive',
  ];

  tabChange(status: string) {
    this.statusFilter = status;
  }

  fetchJobVecancies() {
    this.dashService.getCandidate().subscribe((data: any) => {
      console.log('hbhvdhsdh', data);
      this.candidate = data;
    });
  }
}
