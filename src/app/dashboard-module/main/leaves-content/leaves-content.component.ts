import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
// import { format, parseISO } from 'date-fns';
import * as moment from 'moment';
import { style } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css'],
})
export class LeavesContentComponent {
  designationdropdownOption: boolean = false;
  parentSelector = false;
  test: any = 'All';
  // searchText: string;
  status: string;
  leaves: any[] = [];
  employeeid = '';
  employeename = '';
  totalCount = 0;
  acceptCount = 0;
  rejectCount = 0;
  pendingCount = 0;
  accept_graph: any;
  reject_graph: any;
  pending_graph: any;

  //----------Harpreet Code-------
  //
  //

  constructor(private dashService: DashService, private http: HttpClient) {
    dashService.activeComponent = 'leaves';
    dashService.headerContent = '';
    this.Selectvariable = 'all';
    this.fetchPendingLeave();
    this.graphleave();
    this.leavecontentload();
  }
  total: number = 0;
  pendingcount: number = 0;
  acceptcount: number = 0;
  rejectcount: number = 0;

  // //////////////////////////////////////////////////////////////////////

  //////////////////////Harpreet Singh work on leaves  //////////////////////////////

  acceptleave = new Array();
  rejectleave = new Array();
  pendingleave = new Array();
  allLeaves = [];
  pendingshow = true;
  rejectshow = false;
  acceptshow = false;
  acceptdata: any;
  acceptmessage: any = '';
  acceptall = false;
  rejectall = false;

  graphleave() {
    this.dashService.getleavegraph().subscribe((res: any) => {
      res.graph.map((d: any) => {
        this.total = this.total + d.count;
        if (d._id == 'pending') {
          this.pendingcount = d.count;
        }
        if (d._id == 'reject') {
          this.rejectcount = d.count;
        }
        if (d._id == 'accept') {
          this.acceptcount = d.count;
        }
      });
    });
  }
  allchecked = false;
  count = 0;
  fetchPendingLeave() { }
  onChange($event) {
    const id = $event.target.value;
    const ischecked = $event.target.checked;
    this.pendingleave.map((d: any) => {
      if (d._id == id) {
        if (ischecked == true) {
          this.count++;
          if ((this.pendingleave.length == this.count)) {
            this.parentSelector = true;
            d.select = ischecked;
            return d;
          }
        } else {
          this.count--;
        }
        d.select = ischecked;
        this.parentSelector = false;

        return d;
      }
      if (id == -1) {
        if (this.parentSelector == false) {
          this.count = 0;
        } else {
          this.count++;
        }
        d.select = this.parentSelector;
        return d;
      }
      return d;
    });
    this.showSearchBox = true;
  }

  leavecontentload() {
    this.dashService.getleavecontent().subscribe((res: any) => {
      res.map((d: any) => {
        if (d._id == 'pending') {
          this.pendingleave = d.pending;
        } else if (d._id == 'reject') {
          this.rejectleave = d.leave;
        } else {
          this.acceptleave = d.leave;
        }
      });
      console.log(res);
      let temp=[];
      temp = this.pendingleave.concat(this.rejectleave);
      temp = temp.concat(this.acceptleave);
      this.leaves=temp;
      console.log(this.leaves);
    });
  }

  acceptfunction() {
    this.showModal = true;
    this.acceptdata = this.pendingleave;
    this.acceptall = true;
  }

  rejectfunction() {
    this.showModal1 = true;
    this.acceptdata = this.pendingleave;
    this.rejectall = true;
  }

  filter = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    category: new FormControl(''),
    // type:new FormControl('')
  });

  search() {
    this.filter.value.category = this.Selectvariable;

    this.dashService.filterleave(this.filter.value).subscribe((res: any) => {
      this.pendingleave=[];
      this.rejectleave=[];
      this.acceptleave=[];
      res.result.map((d: any) => {
        if (d._id == 'pending') {
          this.pendingleave = d.pending;
        } else if (d._id == 'reject') {
          this.rejectleave = d.leave;
        } else if (d._id == 'accept') {
          this.acceptleave = d.leave;
        }
      });
      let temp=[];
      temp = this.pendingleave.concat(this.rejectleave);
      temp = temp.concat(this.acceptleave);
      this.leaves=temp;
      console.log(this.leaves);
    });
  }
  cancel() {
    this.filter.reset();
    this.Selectvariable = 'all';
    (this.filter.value.from = ''),
      (this.filter.value.to = ''),
      (this.filter.value.category = 'all'),
      this.dashService.filterleave(this.filter.value).subscribe((res: any) => {
        res.result.map((d: any) => {
          if (d._id == 'pending') {
            this.pendingleave = d.pending;
          } else if (d._id == 'reject') {
            this.rejectleave = d.leave;
          } else if (d._id == 'accept') {
            this.acceptleave = d.leave;
          }
        });
      });
      let temp=[];
      temp = this.pendingleave.concat(this.rejectleave);
      temp = temp.concat(this.acceptleave);
      this.leaves=temp;
      console.log(this.leaves);
  }

  /////////////////////////////////////////////////////////////////////////
  /////////////////       Harpreet Work       /////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    //  --------------------Drop Down form-------------
    const optionMenu = document.querySelector<HTMLElement>('.search_form')!,
      selectBtn = optionMenu.querySelector<HTMLElement>('.select-btn')!;
    selectBtn.addEventListener('click', () =>
      optionMenu.classList.toggle('active')
    );
  }

  updateafteraction() {
    this.dashService.getLeaves().subscribe((res: any) => {
      // this.leaves = res;
      this.totalCount = this.getTotal();
      this.acceptCount = this.getCount('accept');
      this.rejectCount = this.getCount1('reject');
      this.pendingCount = this.getCount3('pending');

      this.accept_graph = this.acceptCalculate();
      this.reject_graph = this.rejectCalculate();
      this.pending_graph = this.pendingCalculate();

      // this.leaves = this.leaves.sort((a, b) => {
      //   if (a.status > b.status) return 1;
      //   if (a.status < b.status) return -1;
      //   return 1;
      // });
    });
  }
  getTotal() {
    return this.leaves.length;
  }

  getCount(status1) {
    return this.leaves.filter((o) => o.status == status1).length;
  }

  getCount1(status2) {
    return this.leaves.filter((o) => o.status === status2).length;
  }
  getCount3(status3) {
    return this.leaves.filter((o) => o.status == status3).length;
  }

  acceptCalculate() {
    return (this.acceptCount / this.totalCount) * 100;
  }
  rejectCalculate() {
    return (this.rejectCount / this.totalCount) * 100;
  }
  pendingCalculate() {
    return (this.pendingCount / this.totalCount) * 100;
  }

  changeFilter(value: any) {
    this.test = value;
  }

  // async updateLeaveStatus(object: any, status: 'accept' | 'reject') {
  //   this.dashService.updateleave(object, status);
  //   await this.updateafteraction();
  // }

  // -------------------Drop Down---------------------
  array: any = [
    {
      id: 0,
      name: 'all',
    },
    {
      id: 1,
      name: 'Casual Leave',
    },
    {
      id: 2,
      name: 'Medical Leave',
    },
    {
      id: 3,
      name: 'Compensatory Leave',
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
  }

  contentdropdown1: boolean = false;
  dropdownOpen1() {
    this.contentdropdown1 = !this.contentdropdown1;
  }
  Selectvariable1: string = 'all';
  colorvariable1: number = 0;
  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.colorvariable = arr1.id;
    this.contentdropdown1 = false;
  }

  id: any = 'Pending';
  tabChange(ids: any) {
    this.id = ids;
    if (ids == 'Pending') {
      this.pendingshow = true;
      this.rejectshow = false;
      this.acceptshow = false;
    } else if (ids == 'Rejected') {
      this.pendingshow = false;
      this.rejectshow = true;
      this.acceptshow = false;
    } else {
      this.pendingshow = false;
      this.rejectshow = false;
      this.acceptshow = true;
    }
  }
  showSearchBox = false;
  showSearchBox1 = true;

  toggleSearchBox1() {
    this.showSearchBox = !this.showSearchBox;
    this.showSearchBox1 = false;
    this.allchecked = !this.allchecked;
  }
  showModal = false;
  index: any;
  openModal(data: any, index: any) {
    this.acceptdata = data;
    this.showModal = true;
    this.index = index;
  }
  showModal1 = false;
  openModal1(data: any, index: any) {
    this.acceptdata = data;
    this.showModal1 = true;
    this.showModal = false;
  }

  showModal2 = false;
  openModal2() {
    let accepttemp = [];
    let pendingtemp = [];
    if (this.acceptall == false) {
      let row = this.pendingleave[this.index];
      this.pendingleave.splice(this.index, 1);

      this.leaves.map((item:any)=>{
          if(item._id==this.acceptdata._id)
          {
            item.status='accept'
          }
      })


      this.dashService
        .updateleavestatus(this.acceptdata._id, 'accept', this.acceptmessage)
        .subscribe((res:any) => {
          this.graphleave();
         });

      if (this.acceptdata.type="Full Day Leave") {
        this.dashService
          .updateleave(
            this.acceptdata.empId,
            this.acceptdata.from,
            this.acceptdata.to
          )
          .subscribe((res: any) => { });
      }
      this.acceptleave.push(row);
      this.acceptmessage = '';

      this.showModal2 = true;
      this.showModal = false;
    } else {
      this.acceptdata.map((data: any, index: any, arr) => {
        if (data.select == true) {
          this.leaves.map((item:any)=>{
            if(item._id==data._id)
            {
              item.status='accept'
            }
        })

          this.dashService
            .updateleavestatus(data._id, 'accept', this.acceptmessage)
            .subscribe((res:any) => { });
          const row = this.acceptdata[index];
          this.acceptleave.push(row);
          if (data.type="Full Day Leave") {
            this.dashService.updateleave(data.empId, data.from, data.to).subscribe((res: any) => { });
          }
        } else {
          const row = this.acceptdata[index];
          pendingtemp.push(row);
        }
        this.graphleave();
      });

      //////////////////////////////////////////
      this.pendingleave = pendingtemp;
      this.showModal2 = true;
      this.showModal = false;
      this.acceptall = false;
      // this.leavecontentload();
      // this.graphleave();
    }
  }
  showModal3 = false;
  openModal3() {
    let pendingtemp = [];
    if (this.rejectall == false) {
      this.showModal3 = true;
      this.showModal1 = false;
      let row = this.pendingleave[this.index];
      this.pendingleave.splice(this.index, 1);
      this.leaves.map((item:any)=>{
        if(item._id==this.acceptdata._id)
        {
          item.status='reject'
        }
    })
      this.dashService
        .updateleavestatus(this.acceptdata._id, 'reject', this.acceptmessage)
        .subscribe((res:any) => { this.graphleave(); });
      this.acceptmessage = '';
      this.rejectleave.push(row);
    } else {
      this.showModal3 = true;
      this.showModal1 = false;
      this.acceptdata.map((data: any, index: any) => {
        if (data.select == true) {
          this.leaves.map((item:any)=>{
            if(item._id==data._id)
            {
              item.status='reject'
            }
        })
          this.dashService
            .updateleavestatus(data._id, 'reject', this.acceptmessage)
            .subscribe((res:any) => {  this.graphleave(); });
          const row = this.acceptdata[index];
          this.rejectleave.push(row);
        } else {
          const row = this.acceptdata[index];
          pendingtemp.push(row);
        }
        this.graphleave();

      });
      this.pendingleave = pendingtemp;
      this.rejectall = false;
      this.acceptmessage = '';
    }
  }
  closeModal() {
    this.showModal = false;
    this.showModal1 = false;
    this.showModal2 = false;
    this.showModal3 = false;
  }
  toggleSearchBox() {
    this.showSearchBox = !this.showSearchBox;
    this.showSearchBox1 = false;
  }
}
