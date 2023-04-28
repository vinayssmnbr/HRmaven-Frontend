import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

import { EmpService } from '../../shared/emp.service';
@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css'],
})
export class LeavesContentComponent {
  // empleaveForm: FormGroup;

  leaves=[];
  str="";

  constructor(public empService: EmpService, private formBuilder: FormBuilder) {
    empService.activeComponent = 'leave';
    empService.headerContent = '';
    this.leavegraphcontent();
  }

  leavegraphcontent() {
    this.empService.leavegraph().subscribe((res: any) => {
      console.log(res.response);
    })

    this.empService.leavehistory().subscribe((res:any)=>{
      console.log(res.response[0].History);
      this.leaves=res.response[0].History;
    })

  }


  Submit(){
    console.log(this.empleaveForm.value);
  }
  ngOnIt() {
  }

  empleaveForm = new FormGroup({
    from: new FormControl("", [Validators.required]),
    to: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    duration: new FormControl("", Validators.required),
    url:new FormControl(""),
    reason:new FormControl("")
  })
  getDates() {
    const dateArray: string[] = [];
    let startDate = this.empleaveForm.value.from;
    let stopDate=this.empleaveForm.value.to;
    let currentDate = moment(startDate);
    const endDate = moment(stopDate);
    while (currentDate <= endDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    let len =  dateArray.length;
     this.str = len.toString()
    let obj = {duration:this.str};
    this.empleaveForm.value.duration = this.str;

  }

  array: any = [

    {
      id: 0,
      name: 'casual',
    },
    {
      id: 1,
      name: 'medical',
    },
    {
      id: 2,
      name: 'urgent',
    },
    {
      id: 3,
      name: 'earned',
    }
  ];







  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Category';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
    this.empleaveForm.value.category=arr.name;

  }
  leaveshistory = false;
  employeemaintable = true;
  tablehistory() {
    this.leaveshistory = true;
    this.employeemaintable = false;
  }
  employee_leaves() {
    this.leaveshistory = false;
    this.employeemaintable = true;
  }

  // ---------Modal popoup----------
  leave_approved_form = false;
  applyleaves() {
    this.leave_approved_form = true;
    this.Submit();
  }
  closemodal() {
    this.leave_approved_form = false;
  }
  designationdropdownOption: boolean = false;

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }

}
