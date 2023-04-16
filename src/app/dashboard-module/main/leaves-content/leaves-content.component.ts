import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
// import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css'],
})
export class LeavesContentComponent {
  circularProgress: any;
  progressValue: any;
  progressStartValue = 0;
  progressEndValue = 50;
  speed = 100;
  progressInterval: any;
  test: any = 'All';
  // searchText: string;
  status: string;
  leaves: any[] = [];
  employeeid = '';
  employeename = '';
  totalCount = 0;
  acceptCount= 0;
  rejectCount = 0;
  pendingCount = 0;
  accept_graph:any;
  reject_graph:any;
  pending_graph:any;


  ngOnInit() {}

  constructor(private dashService: DashService, private http: HttpClient) {
    dashService.activeComponent = 'leaves';
    dashService.headerContent = '';
    this.updatereload();

  }

  updatereload()

  {
    this.dashService.getLeaves().subscribe((res: any) => {
      console.log('data', res);
      this.leaves = res;
      this.totalCount = this.getTotal()
      this.acceptCount = this.getCount('accept')
      this.rejectCount = this.getCount1('reject')
      this.pendingCount = this.getCount3('pending')

      this.accept_graph = this.acceptCalculate()
      this.reject_graph = this.rejectCalculate()
      this.pending_graph = this.pendingCalculate()

      this.leaves = this.leaves.sort((a, b) => {
        if (a.status > b.status) return 1;
        if (a.status < b.status) return -1;
        return 1;
      });
      console.log(this.leaves);
    });
  }
  getTotal(){
    return this.leaves.length;
  }

  getCount(status1) {
    return this.leaves.filter(o => o.status == status1).length;
  }

  getCount1(status2){
    return this.leaves.filter(o=>o.status === status2).length;
  }
  getCount3(status3){
    return this.leaves.filter(o=>o.status == status3).length;
  }

  acceptCalculate(){
    return ((this.acceptCount/this.totalCount)*100);
  }
  rejectCalculate(){
    return ((this.rejectCount/this.totalCount)*100)
  }
  pendingCalculate(){
    return ((this.pendingCount/this.totalCount)*100)
  }


  changeFilter(value: any) {
    this.test = value;
    console.log(this.test);
  }

  updateLeaveStatus(id: any, status: 'accept' | 'reject') {
    const url = `https://hrmaven.works/api/leave/${id}`;
    const body = { status: status };
    this.http
      .patch(url, JSON.stringify(body), {
        headers: { 'content-type': 'application/json' },
      })
      .subscribe(
        (response) => {
          console.log('Leave status updated successfully: ', response);
        },
        (error) => {
          console.error('Error updating leave status:', error);
        }
      );
      this.updatereload();
  }
  onAccept(id: any) {
    this.updateLeaveStatus(id, 'accept');
  }

  onReject(id: any) {
    this.updateLeaveStatus(id, 'reject');
  }
  array: any = [
    {
      id: 0,
      name: 'All',
    },
    {
      id: 1,
      name: 'Pending',
    },
    {
      id: 3,
      name: 'Rejected',
    },
    {
      id: 4,
      name: 'Approved',
    },
  ];
  contentdropdown: boolean = false;

  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;

  }
  Selectvariable: string = 'Select';
  colorvariable: number = 0;


  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
  }
}
