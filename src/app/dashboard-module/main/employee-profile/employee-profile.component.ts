import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {
personaldetail:boolean=true;
jobdetail:boolean=false;
showModal:boolean=false;
modalContent1:boolean=false;
modalContent2:boolean=false;
isJobDetailsActive = false;
isPersonalDetailsActive=true;
  form = new FormGroup({
    name:new FormControl(''),
    uid:new FormControl(''),
    dob:new FormControl(''),
    fname:new FormControl(''),
    mname:new FormControl(''),
    mstatus:new FormControl(''),
    bgroup:new FormControl(''),
    nation:new FormControl(''),
    cno:new FormControl(''),
    address:new FormControl(''),
    city:new FormControl(''),
    email:new FormControl(''),
    pcode:new FormControl(''),
    state:new FormControl(''),
    bname:new FormControl(''),
    adhaarno: new FormControl(''),
    bno: new FormControl(''),
    ifsc: new FormControl(''),
    panno: new FormControl(''),
    pno: new FormControl(''),
    inst1: new FormControl(''),
    mper: new FormControl(''),
    inst2: new FormControl(''),
    dper: new FormControl(''),
    gcol: new FormControl(''),
    stream: new FormControl(''),
    sgpa: new FormControl(''),
    orgname: new FormControl(''),
    duration2: new FormControl(''),
    designation: new FormControl(''),
    location2: new FormControl(''),
    designation2: new FormControl(''),
    estatus: new FormControl(''),
    jdate: new FormControl(''),
    location3: new FormControl(''),
    timings: new FormControl(''),
    ctc: new FormControl('')
  });
personaldetails(){
this.personaldetail=true;
this.jobdetail=false;
this.isPersonalDetailsActive=true;
this.isJobDetailsActive=false;
}
jobdetails(){
this.jobdetail=true;
this.personaldetail=false;
this.isJobDetailsActive=true;
this.isPersonalDetailsActive=false;
}

openmodal1(){
this.showModal=true;
this.fourthStep=false;
if(this.personaldetail===true)
{
  this.modalContent1=true;
  this.modalContent2=false;
}
else if(this.jobdetail===true){
  this.modalContent2=true;
  this.modalContent1=false;
}
}
closeModal(){
  this.showModal=false;
}
fourthStep:boolean=false;
closeModal2(){
  this.fourthStep=true;
  this.modalContent2=false;
  this.modalContent1=false;
}
}
