import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { EmpService } from '../../shared/emp.service';
@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css'],
})
export class LeavesContentComponent {
  // empleaveForm: FormGroup;

  constructor(public empService:EmpService, private formBuilder:FormBuilder){
    empService.activeComponent = 'leave';
    empService.headerContent = '';

  }

  ngOnIt() {



  }

  empleaveForm = new FormGroup({
    from :new FormControl("",[Validators.required]),
    to:  new FormControl("",[Validators.required]),
    category: new FormControl("",[Validators.required]),
    duration: new FormControl("",Validators.required)
  })




  array: any = [
    {
      id: 0,
      name: 'Casual',
    },
    {
      id: 1,
      name: 'Medical',
    },
    {
      id: 2,
      name: 'Urgent',
    },
    {
      id: 3,
      name: 'Earned',
    },{
      id:4,
      name:'All'
    }
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
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
  }
  closemodal(){
    this.leave_approved_form = false;
  }
  designationdropdownOption: boolean = false;

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }

  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  onUpload(): void {
    this.empService.upload(this.selectedFile).then(() => {
      console.log('File uploaded successfully.');
    });
  }

  }



