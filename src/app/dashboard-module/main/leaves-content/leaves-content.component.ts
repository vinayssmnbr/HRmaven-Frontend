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
    this.Selectvariable = "all";
    this.fetchPendingLeave();
    this.graphleave();
    this.leavecontentload();
  }
  total = 0;
  pendingcount = 0;
  acceptcount = 0;
  rejectcount = 0;

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
      res.map((d: any) => {
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
      })
    })
  }
  allchecked = false;

  fetchPendingLeave() {}
  onChange($event) {
    const id = $event.target.value;
    const ischecked = $event.target.checked;
    this.pendingleave.map((d: any) => {
      if (d._id == id) {
        d.select = ischecked;
        this.parentSelector = false;
        return d;
      }
      if (id == -1) {
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

      })


    })
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

      res.result.map((d: any) => {
        if (d._id == 'pending') {
          this.pendingleave = d.pending;
        } else if (d._id == 'reject') {
          this.rejectleave = d.leave;
        }
        else if (d._id == "accept") {
          this.acceptleave = d.leave;
        }
      });
    });
  }
  cancel() {
    this.filter.reset();
    this.Selectvariable = 'all';
    this.filter.value.from = '',
      this.filter.value.to = '',
      this.filter.value.category = 'all',

      this.dashService.filterleave(this.filter.value).subscribe((res: any) => {

        res.result.map((d: any) => {
          if (d._id == "pending") {
            this.pendingleave = d.pending;
          }
          else if (d._id == "reject") {
            this.rejectleave = d.leave;
          }
          else if (d._id == "accept") {
            this.acceptleave = d.leave;
          }

        })
      })
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
    //------------ Progress Bar Girija----------
    const max = -219.99078369140625;
    const progressElements = document.querySelectorAll('.progress');
    progressElements.forEach((value, index) => {
      const percent = parseFloat(value.getAttribute('data-progress'));
      value
        .querySelector('.fill')
        .setAttribute(
          'style',
          `stroke-dashoffset: ${((100 - percent) / 100) * max}`
        );
    });
    
  }

  // async updatereload() {
  //   this.dashService.getLeaves().subscribe((res: any) => {

  //     this.leaves = res;
  //     this.totalCount = this.getTotal();
  //     this.acceptCount = this.getCount('accept');
  //     this.rejectCount = this.getCount1('reject');
  //     this.pendingCount = this.getCount3('pending');

  //     this.accept_graph = this.acceptCalculate();
  //     this.reject_graph = this.rejectCalculate();
  //     this.pending_graph = this.pendingCalculate();

  //     this.leaves = this.leaves.sort((a, b) => {
  //       if (a.status > b.status) return 1;
  //       if (a.status < b.status) return -1;
  //       return 1;
  //     });

  //   });
  // }

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
      name: 'casual',
    },
    {
      id: 2,
      name: 'medical',
    },
    {
      id: 3,
      name: 'urgent',
    },
    {
      id: 4,
      name: 'earned',
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
      this.pendingcount = this.pendingcount - 1;
      this.acceptcount = this.acceptcount + 1;

      this.dashService.updateleavestatus(this.acceptdata._id, "accept", this.acceptmessage).subscribe((res) => {
      });

      this.dashService.updateleave(this.acceptdata.uid, this.acceptdata.from, this.acceptdata.to).subscribe((res: any) => {
      })

      this.acceptleave.push(row);
      this.acceptmessage = '';
      this.graphleave();
      this.showModal2 = true;
      this.showModal = false;
    }
    else {


      this.acceptdata.map((data: any, index: any, arr) => {
        if (data.select == true) {
          this.dashService.updateleavestatus(data._id, "accept", this.acceptmessage).subscribe((res) => {
          });
          const row = this.acceptdata[index];
          this.acceptleave.push(row);
          this.dashService.updateleave(data.uid, data.from, data.to).subscribe((res: any) => {

          })
          this.pendingcount = this.pendingcount - 1;
          this.acceptcount = this.acceptcount + 1;

        } else {
          const row = this.acceptdata[index];
          pendingtemp.push(row);
        }
      })
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
      this.rejectcount = this.rejectcount + 1;
      this.dashService.updateleavestatus(this.acceptdata._id, "reject", this.acceptmessage).subscribe((res) => {

      });
      this.pendingcount = this.pendingcount - 1;
      this.rejectcount = this.rejectcount + 1;
      this.acceptmessage = "";
      this.rejectleave.push(row);
      this.graphleave();
    } else {
      this.showModal3 = true;
      this.showModal1 = false;
      this.acceptdata.map((data: any, index: any) => {
        if (data.select == true) {
          this.dashService.updateleavestatus(data._id, "reject", this.acceptmessage).subscribe((res) => {
          });
          this.pendingcount = this.pendingcount - 1;
          this.rejectcount = this.rejectcount + 1;
          const row = this.acceptdata[index];
          this.rejectleave.push(row);
        }
        else {
          const row = this.acceptdata[index];
          pendingtemp.push(row);
        }
      })
      this.pendingleave = pendingtemp;
      this.rejectall = false;
      this.acceptmessage = "";
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
