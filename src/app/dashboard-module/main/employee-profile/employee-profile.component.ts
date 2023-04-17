import { Component, Input } from '@angular/core';
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
  @Input() user:any
  constructor(private dashService:DashService){
  }
  ngOnInit(){
    this.dashService.getEmployee().subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
    });
    this.user=this.dashService.getSelectedEmployee()
    console.log(this.user)
  }

  selectedUser: any = {};
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
maritalStatus:string='';
bloodGroup:string='';
bankname:string='';
gender:string=''

  form = new FormGroup({
    uid:new FormControl(''),
    name:new FormControl(''),
    designation:new FormControl(''),
    email:new FormControl(''),
    mobile:new FormControl(''),
    dateOfJoining:new FormControl(''),
    dateOfBirth:new FormControl(''),
    gender:new FormControl(''),
    address:new FormControl(''),
    bankname:new FormControl(''),
    adhaarno:new FormControl(''),
    accountno:new FormControl(''),
    ifsc:new FormControl(''),
    fatherName:new FormControl(''),
    motherName:new FormControl(''),
    maritalStatus: new FormControl(''),
    bloodGroup: new FormControl(''),
    nationality: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    state: new FormControl(''),
    passport: new FormControl(''),
    matric: new FormControl(''),
    matricPercent: new FormControl(''),
    inter: new FormControl(''),
    interPercent: new FormControl(''),
    graduation: new FormControl(''),
    graduationStream:new FormControl(''),
    graduationCgpa: new FormControl(''),
    pg: new FormControl(''),
    pgStream: new FormControl(''),
    pgCgpa: new FormControl(''),
    company: new FormControl(''),
    duration: new FormControl(''),
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
      name: 'Single',
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
      name: 'O+',
    },
    {
      id:8,
      name: 'O-',
    }

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
    this.bankname=arr2.name
  }
  Selectvariable3: string = 'Select';
  colorvariable3: number = 0;
  Changeselect3(arr3: any) {
    this.Selectvariable3 = arr3.name;
    this.colorvariable3 = arr3.id;
    this.contentdropdown3 = false;
    console.log(arr3.name);
    this.maritalStatus=arr3.name
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

openmodal1(user:any){
this.showModal=true;
this.fourthStep=false;
this.selectedUser = { _id: user._id };
this.form.patchValue(user);
console.log('checkuser',this.selectedUser);
console.log('check',this.user)
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
openmodal2(user:any){
  this.fourthStep=false;
  this.showModal=true;
  this.modalContent4=true;
  this.modalContent1=false;
  this.selectedUser = { _id: user._id };
  this.form.patchValue(user);

}
closeModal(){
  this.showModal=false;
}
fourthStep:boolean=false;

successMessage:string
basicUpdate(data:any){
  this.fourthStep=true;
  this.modalContent2=false;
  this.modalContent1=false;
  data.maritalStatus=this.maritalStatus
  data.gender=this.gender
  data.bloodGroup=this.bloodGroup
  console.log(this.form.value)
  data.bankname=this.bankname
  const updatedData = this.form.value;
  console.log('abc',updatedData)
  updatedData['_id'] = this.user._id;
  this.dashService.updateEmployee(updatedData).subscribe(() => {
    console.log('Data updated successfully');
  });
console.log('value',this.user)

}
// fetchdata() {
//   this.dashService.getEmployee().subscribe((res: any) => {
//     console.log('data', res);
//     this.employee = res;
//   });
// }
closeModal2(user){
  this.fourthStep=true;
  this.modalContent2=false;
  this.modalContent1=false;

}

closeModal3(user:any){
  this.fourthStep=true;
  this.modalContent1=false;
  this.modalContent2=false;
  this.modalContent4=false;
  const updatedData = this.form.value;
  console.log('abc',updatedData)
  updatedData['_id'] = this.user._id;
  this.dashService.updateEmployee(updatedData).subscribe(() => {
    console.log('Data updated successfully');
    // this.fetchdata()
  });
console.log('value',this.user)

}
openModal3(){
  this.fourthStep = false;
  this.showModal = true;
  this.modalContent4 = false;
  this.modalContent1 = false;
  this.modalContent5=true;
  this.modalContent6=false;
  this.modalContent7=false;
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
  this.modalContent7=false;

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
    this.gender=arr1.name
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
    this.bloodGroup=arr4.name
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

contentshow:boolean=false;
addemployee(){
  this.contentshow=!this.contentshow;
}

}