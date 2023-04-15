import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {
  constructor(private dashService:DashService){
    this.dashService.getEmployee().subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
    })
  }
personaldetail:boolean=true;
jobdetail:boolean=false;
showModal:boolean=false;
modalContent1:boolean=false;
modalContent2:boolean=false;
modalContent4:boolean=false;
modalContent5:boolean=false;
modalContent6:boolean=false;
modalContent7:boolean=false;
isJobDetailsActive = false;
isPersonalDetailsActive=true;
employee: any = [];

  form = new FormGroup({
    name:new FormControl('Vinay'),
    employee_id:new FormControl(''),
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
    pgcol:new FormControl(''),
    pgstream: new FormControl(''),
    pgsgpa: new FormControl(''),
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
  array1: any = [
    {
      id: 0,
      name: 'Male',
    },
    {
      id: 1,
      name: 'Female',
    },
    {
      id: 2,
      name: 'Others',
    }
  ];
  array: any = [
    {
      id: 0,
      name: 'Software Developer',
    },
    {
      id: 1,
      name: 'Forntend Developer',
    },
    {
      id: 3,
      name: 'Full Stack Developer',
    },
    {
      id: 4,
      name: 'UI/UX Designer',
    },
    {
      id: 5,
      name: 'Quality Analyst',
    }
  ];
  array2: any = [
    {
      id: 0,
      name: 'State Bank Of India',
    },
    {
      id: 1,
      name: 'Punjab National Bank',
    },
    {
      id: 2,
      name: 'Central Bank Of India',
    },
    {
      id: 3,
      name: 'HDFC Bank',
    },
    {
      id: 4,
      name: 'ICICI Bank',
    },
    {
      id:5,
      name:'Others',
    }
  ];
  array3: any = [
    {
      id: 0,
      name: 'Married',
    },
    {
      id: 1,
      name: 'Unmarried',
    },
  ];
  array4: any = [
    {
      id: 0,
      name: 'A+',
    },
    {
      id: 1,
      name: 'A-',
    },
    {
      id: 3,
      name: 'B+',
    },
    {
      id: 4,
      name: 'B-',
    },
    {
      id: 5,
      name: 'AB+',
    },
    {
      id:6,
      name:'AB-',
    },
    {
      id: 7,
      name: 'Others',
    },

  ];
  array5: any = [
    {
      id: 0,
      name: '9:00 am to 5:00 pm',
    },
    {
      id: 1,
      name: '9:00 am to 6:00pm',
    },
    {
      id: 2,
      name: '10:00 am to 5:00pm',
    },
    {
      id: 1,
      name: '10:00 am to 6:00pm',
    },
  ];
  contentdropdown: boolean = false;
  contentdropdown2: boolean = false;
  contentdropdown3:boolean=false;
  dropdownOpen() {

    this.contentdropdown = !this.contentdropdown;
  }
  dropdownOpen2() {

    this.contentdropdown2 = !this.contentdropdown2;
  }
  dropdownOpen3() {

    this.contentdropdown3 = !this.contentdropdown3;
  }
  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
  }
  Selectvariable2: string = 'Select Bank';
  colorvariable2: number = 0;
  Changeselect2(arr2: any) {
    this.Selectvariable2 = arr2.name;
    this.colorvariable2 = arr2.id;
    this.contentdropdown2 = false;
    console.log(arr2.name);
  }
  Selectvariable3: string = 'Select';
  colorvariable3: number = 0;
  Changeselect3(arr3: any) {
    this.Selectvariable3 = arr3.name;
    this.colorvariable3 = arr3.id;
    this.contentdropdown3 = false;
    console.log(arr3.name);
  }
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
  this.modalContent4 = false;
  this.modalContent5 = false;
  this.modalContent6 = false;
  this.modalContent7 = false;
}
else if(this.jobdetail===true){
  this.modalContent2=true;
  this.modalContent1=false;
  this.modalContent4=false;
  this.modalContent5=false;
  this.modalContent6=false;
  this.modalContent7=false;
}
}
openmodal2(){
  this.fourthStep=false;
  this.showModal=true;
  this.modalContent4=true;
  this.modalContent1=false;
}
closeModal(){
  this.showModal=false;
}
fourthStep:boolean=false;
selectedUser:any={};

closeModal2(){
  this.fourthStep=true;
  this.modalContent2=false;
  this.modalContent1=false;
    console.log(this.form.value)
    const updatedData = this.form.value;
    // console.log(updatedData)
    updatedData['_id'] = this.selectedUser._id;
    this.dashService.updateEmployee(updatedData).subscribe(() => {
      console.log('Data updated successfully');
    });

}
closeModal3(){
  this.fourthStep=true;
  this.modalContent1=false;
  this.modalContent2=false;
  this.modalContent4=false;
}
openModal3(){
  this.fourthStep = false;
  this.showModal = true;
  this.modalContent4 = false;
  this.modalContent1 = false;
  this.modalContent5=true;
  this.modalContent6=false;
}
closeModal4(){
  this.fourthStep = true;
  this.modalContent1 = false;
  this.modalContent2 = false;
  this.modalContent4 = false;
  this.modalContent5=false;
}
openModal4(){
  this.fourthStep = false;
  this.showModal = true;
  this.modalContent4 = false;
  this.modalContent1 = false;
  this.modalContent5 = false;
  this.modalContent6 = true;

}
closeModal5(){
  this.fourthStep = true;
  this.modalContent1 = false;
  this.modalContent2 = false;
  this.modalContent4 = false;
  this.modalContent5 = false;
  this.modalContent6 = false;
}
openModal5(){
  this.fourthStep = false;
  this.showModal = true;
  this.modalContent4 = false;
  this.modalContent1 = false;
  this.modalContent5 = false;
  this.modalContent6 = false;
  this.modalContent7 = true;
}
closeModal6(){
  this.fourthStep = true;
  this.modalContent1 = false;
  this.modalContent2 = false;
  this.modalContent4 = false;
  this.modalContent5 = false;
  this.modalContent6 = false;
  this.modalContent7 = false;
}
  contentdropdown1: boolean = false;
  dropdownOpen1() {

    this.contentdropdown1 = !this.contentdropdown1;
  }
  Selectvariable1: string = 'Select';
  colorvariable1: number = 0;
  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.colorvariable1 = arr1.id;
    this.contentdropdown1 = false;
    console.log(arr1.name);
  }
  contentdropdown4: boolean = false;
  dropdownOpen4() {

    this.contentdropdown4 = !this.contentdropdown4;
  }
  Selectvariable4: string = 'Select';
  colorvariable4: number = 0;
  Changeselect4(arr4: any) {
    this.Selectvariable4 = arr4.name;
    this.colorvariable4 = arr4.id;
    this.contentdropdown4 = false;
    console.log(arr4.name);
  }
  contentdropdown5: boolean = false;
  dropdownOpen5() {

    this.contentdropdown5 = !this.contentdropdown5;
  }
  Selectvariable5: string = 'Select';
  colorvariable5: number = 0;
  Changeselect5(arr5: any) {
    this.Selectvariable5 = arr5.name;
    this.colorvariable5 = arr5.id;
    this.contentdropdown5 = false;
    console.log(arr5.name);
  }

  // fetchdata() {
  //   this.dashService.getEmployee().subscribe((res: any) => {
  //     console.log('data', res);
  //     this.employee = res;
  //   });
  // }



}
