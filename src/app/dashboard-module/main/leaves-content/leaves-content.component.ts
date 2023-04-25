import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
// import { format, parseISO } from 'date-fns';
import * as moment from 'moment';
import { style } from '@angular/animations';

@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css'],
})
export class LeavesContentComponent {
  designationdropdownOption: boolean = false;
  parentSelector: boolean = false
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
  constructor(private dashService: DashService, private http: HttpClient) {
    dashService.activeComponent = 'leaves';
    dashService.headerContent = '';
    this.fetchPendingLeave();
  }

  row: any = [
    {
      id: 1,
      select: false,
      name: 'dumpling'
    },
    {
      id: 2,
      select: false,
      name: 'burger'
    },
    {
      id: 3,
      select: false,
      name: 'sandwic'
    },
  ];

  allchecked = false;
  fetchPendingLeave() {}
  onChange($event) {
    const id = $event.target.value;
    const ischecked = $event.target.checked;
    this.row.map((d) => {
      if (d.id == id) {
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
    console.log(this.row);
  }
  ngOnInit() {
    //  --------------------Drop Down form-------------
    const optionMenu = document.querySelector<HTMLElement>('.search_form')!,
      selectBtn = optionMenu.querySelector<HTMLElement>('.select-btn')!;
    selectBtn.addEventListener('click', () =>
      optionMenu.classList.toggle('active')
    );

    // --------------Progress Bar-----------

    const progressBar = document.querySelector(
      '.circular-progress'
    ) as HTMLElement;
    const valueContainer = document.querySelector(
      '.value-container'
    ) as HTMLElement;

    let progressValue = -1;
    const progressEndValue = 0;
    const speed = 50;

    const progress = setInterval(() => {
      progressValue++;
      valueContainer.textContent = `${progressValue}%`;

      progressBar.style.background = `conic-gradient(
        #4d5bf9 ${progressValue * 3.6}deg,
        #D9D9D9 ${progressValue * 3.6}deg
      )`;

      if (progressValue === progressEndValue) {
        clearInterval(progress);
      }
    }, speed);

    const progressBar1 = document.querySelector(
      '.circular-progress1'
    ) as HTMLElement;
    const valueContainer1 = document.querySelector(
      '.value-container1'
    ) as HTMLElement;

    let progressValue1 = -1;
    const progressEndValue1 = 0;
    const speed1 = 50;

    const progress1 = setInterval(() => {
      progressValue1++;
      valueContainer1.textContent = `${progressValue1}%`;

      progressBar1.style.background = `conic-gradient(
        #7BD36D ${progressValue1 * 3.6}deg,
        #D9D9D9 ${progressValue1 * 3.6}deg
      )`;

      if (progressValue1 === progressEndValue1) {
        clearInterval(progress1);
      }
    }, speed1);

    const progressBar2 = document.querySelector(
      '.circular-progress2'
    ) as HTMLElement;
    const valueContainer2 = document.querySelector(
      '.value-container2'
    ) as HTMLElement;

    let progressValue2 = -1;
    const progressEndValue2 = 0;
    const speed2 = 50;

    const progress2 = setInterval(() => {
      progressValue2++;
      valueContainer2.textContent = `${progressValue2}%`;

      progressBar2.style.background = `conic-gradient(
        #F8BB6F ${progressValue2 * 3.6}deg,
        #D9D9D9 ${progressValue2 * 3.6}deg
      )`;

      if (progressValue2 === progressEndValue2) {
        clearInterval(progress2);
      }
    }, speed2);

    const progressBar3 = document.querySelector(
      '.circular-progress3'
    ) as HTMLElement;
    const valueContainer3 = document.querySelector(
      '.value-container3'
    ) as HTMLElement;

    let progressValue3 = -1;
    const progressEndValue3 = 0;
    const speed3 = 50;

    const progress3 = setInterval(() => {
      progressValue3++;
      valueContainer3.textContent = `${progressValue3}%`;

      progressBar3.style.background = `conic-gradient(
        #FA9796 ${progressValue3 * 3.6}deg,
        #D9D9D9 ${progressValue3 * 3.6}deg
      )`;

      if (progressValue3 === progressEndValue3) {
        clearInterval(progress3);
      }
    }, speed3);
  }

  async updatereload() {
    this.dashService.getLeaves().subscribe((res: any) => {
      console.log('data', res);
      this.leaves = res;
      this.totalCount = this.getTotal();
      this.acceptCount = this.getCount('accept');
      this.rejectCount = this.getCount1('reject');
      this.pendingCount = this.getCount3('pending');

      this.accept_graph = this.acceptCalculate();
      this.reject_graph = this.rejectCalculate();
      this.pending_graph = this.pendingCalculate();

      this.leaves = this.leaves.sort((a, b) => {
        if (a.status > b.status) return 1;
        if (a.status < b.status) return -1;
        return 1;
      });
      console.log(this.leaves);
    });
  }

  updateafteraction() {
    this.dashService.getLeaves().subscribe((res: any) => {
      console.log('data', res);
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
      // console.log(this.leaves);
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
    console.log(this.test);
  }

  async updateLeaveStatus(object: any, status: 'accept' | 'reject') {
    this.dashService.updateleave(object, status);
    await this.updateafteraction();
  }

  // -------------------Drop Down---------------------
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
  Selectvariable: string = 'Select';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
  }
  array1: any = [
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
  contentdropdown1: boolean = false;
  dropdownOpen1() {
    this.contentdropdown1 = !this.contentdropdown1;
  }
  Selectvariable1: string = 'Select';
  colorvariable1: number = 0;
  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.colorvariable = arr1.id;
    this.contentdropdown1 = false;
    console.log(arr1.name);
  }

  id: any = 'Pending';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }
  showSearchBox = false;
  showSearchBox1 = true;

  toggleSearchBox1() {
    this.showSearchBox = !this.showSearchBox;
    this.showSearchBox1 = false;
    this.allchecked = !this.allchecked;
  }
  showModal = false;
  openModal() {
    this.showModal = true;
  }
  showModal1 = false;
  openModal1() {
    this.showModal1 = true;
    this.showModal = false;
  }

  showModal2 = false;
  openModal2() {
    this.showModal2 = true;
    this.showModal = false;
  }
  showModal3 = false;
  openModal3() {
    this.showModal3 = true;
    this.showModal1 = false;
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
