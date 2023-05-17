import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
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
  array1: any = [
    {
      id: 0,
      name: 'Resume Received',
    },
    {
      id: 1,
      name: 'Archive',
    },
    {
      id: 2,
      name: 'Hired',
    },
    {
      id: 3,
      name: 'Shortlisted',
    },
    {
      id: 4,
      name: 'Rejected',
    },
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  contentdropdown1: boolean = false;
  dropdownOpen1() {
    this.contentdropdown1 = !this.contentdropdown1;
  }
  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable=arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown=false;
    console.log(arr.name);
  }
  Selectvariable1: string = 'Designation';
  colorvariable1: number = 0;
  Changeselect1(arr1: any) {
    this.Selectvariable1=arr1.name;
this.contentdropdown1=false;
    this.colorvariable1 = arr1.id;
    console.log(arr1.name);
  }
  Jobdetails: boolean = false;
  viewbtn(){
    this.Jobdetails = true;
  }
  close_modal(){
    this.Jobdetails = false;
  }
  addcandidate:boolean=false;
  closemodal(){
    this.addcandidate=false;
  }
  openmodal(){
    this.addcandidate=true;

  }
  Newcandidate:boolean=false;


  openaddmodal(){
  this.Newcandidate=true;
  this.addcandidate=false;
  console.log(this.newcandidateform.value)


  }
  closedone(){
    this.Newcandidate=false;
  }

  newcandidateform = new FormGroup({
    candidateName : new FormControl(''),
    contactnumber:new FormControl(''),
    email:new FormControl(''),

    applieddate:new FormControl(''),

    resume:new FormControl(''),





  })

  newcandidatedetail(){
    console.warn(this.newcandidateform.value)
  }




  






  
}
