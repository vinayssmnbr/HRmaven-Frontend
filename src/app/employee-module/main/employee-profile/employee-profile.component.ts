import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { EmpService } from '../../shared/emp.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent {
  isJobDetailsActive = false;
  isPersonalDetailsActive = true;
  isPasswordManagement = false;
  personaldetail: boolean = true;
  jobdetail: boolean = false;
  showdata: boolean = false;
  showbutton: boolean = true;
  viewless: boolean = false;
  showModal: boolean = false;
  modalContent1: boolean = false;
  modalContent2: boolean = false;
  modalContent4: boolean = false;
  modalContent5: boolean = false;
  contentdropdown: boolean = false;
  contentdropdown1: boolean = false;
  contentdropdown2: boolean = false;
  contentdropdown3: boolean = false;
  contentdropdown4: boolean = false;
  contentdropdown5: boolean = false;
  contentdropdown6: boolean = false;
  contentdropdown7: boolean = false;
  contentdropdown8: boolean = false;
  employee: any[] = [];
  obj: any;
  constructor(private empdashService: EmpService) {
    this.empdashService.getEmployeeRecord().subscribe((res) => {
      console.log('pro', res);
      this.obj = res.response;
      console.log('xyz', this.obj);
    });
  }

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
    },
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
    },
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
      id: 5,
      name: 'Others',
    },
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
      id: 6,
      name: 'AB-',
    },
    {
      id: 7,
      name: 'O+',
    },
    {
      id: 8,
      name: 'O-',
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
  array8: any = [
    {
      id: 0,
      name: 'Full-Time Permanent',
    },
    {
      id: 1,
      name: 'Part-Time Employement',
    },
    {
      id: 2,
      name: 'Internship',
    },
  ];

  passwordform = new FormGroup({
    oldpassword:new FormControl('',[Validators.required,Validators.pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
    )]),
    password: new FormControl('',[Validators.required,Validators.pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
    )]),
    confirm: new FormControl('',[Validators.required,Validators.pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
    )]),
  });

  empform1 = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
    fatherName: new FormControl(''),
    motherName: new FormControl(''),
    maritalStatus: new FormControl(''),
    bloodGroup: new FormControl(''),
    nationality: new FormControl(''),
  });

  empform2 = new FormGroup({
    mobile: new FormControl(''),
    email: new FormControl(''),
    state: new FormControl(''),
    postalCode: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
  });

  empform3 = new FormGroup({
    bankname: new FormControl(''),
    adhaarno: new FormControl(''),
    accountno: new FormControl(''),
    ifsc: new FormControl(''),
    passport: new FormControl(''),
    panno: new FormControl(''),
  });

  empform6 = new FormGroup({
    jobdesignation: new FormControl(''),
    joblocation: new FormControl(''),
    jobtiming: new FormControl(''),
    jobctc: new FormControl(''),
    jobempstatus: new FormControl(''),
    joiningdate: new FormControl(''),
    profemail: new FormControl(''),
  });

  personaldetails() {
    this.personaldetail = true;
    this.jobdetail = false;
    this.isPersonalDetailsActive = true;
    this.isJobDetailsActive = false;
    this.isPasswordManagement = false;
  }
  jobdetails() {
    this.jobdetail = true;
    this.personaldetail = false;
    this.isJobDetailsActive = true;
    this.isPersonalDetailsActive = false;
    this.isPasswordManagement = false;
  }
  showMoredata() {
    this.showdata = true;
    this.showbutton = false;
    this.viewless = true;
  }
  hidedata() {
    this.showdata = false;
    this.viewless = false;
    this.showbutton = true;
  }

  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
    // this.jobdesignation = arr.name;
    // this.user.jobdesignation = arr.name;
  }

  Selectvariable3: string = 'Select';
  colorvariable3: number = 0;
  Changeselect3(arr3: any) {
    this.Selectvariable3 = arr3.name;
    this.colorvariable3 = arr3.id;
    this.contentdropdown3 = false;
    console.log(arr3.name);
    // this.user['martialStatus'] = arr3.name;
    // this.user.maritalStatus = arr3.name;
  }
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
    // this.user.bloodGroup = arr4.name;
  }
  Selectvariable2: string = 'Select Bank';
  colorvariable2: number = 0;
  Changeselect2(arr2: any) {
    this.Selectvariable2 = arr2.name;
    this.colorvariable2 = arr2.id;
    this.contentdropdown2 = false;
    console.log(arr2.name);
    // this.bankname = arr2.name;
    // this.user.bankname = arr2.name;
  }
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
    // this.jobtiming = arr5.name;
    // this.user.jobtiming = arr5.name;
  }
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
    // this.user.gender = arr1.name;
  }

  dropdownOpen8() {
    this.contentdropdown8 = !this.contentdropdown8;
  }
  Selectvariable8: string = 'Employement Status';
  colorvariable8: number = 0;
  Changeselect8(arr8: any) {
    this.Selectvariable8 = arr8.name;
    this.colorvariable8 = arr8.id;
    this.contentdropdown8 = false;
    console.log(arr8.name);
    // this.jobempstatus=arr8.name
    // this.user.jobempstatus = arr8.name;
  }
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  dropdownOpen2() {
    this.contentdropdown2 = !this.contentdropdown2;
  }
  dropdownOpen3() {
    this.contentdropdown3 = !this.contentdropdown3;
  }
  dropdownClose3() {
    this.contentdropdown3 = false;
  }
  dropdownClose4() {
    this.contentdropdown4 = false;
  }
  dropdownClose1() {
    this.contentdropdown1 = false;
  }
  dropdownClose2() {
    this.contentdropdown2 = false;
  }
  dropdownClose() {
    this.contentdropdown = false;
  }
  dropdownClose8() {
    this.contentdropdown8 = false;
  }
  dropdownClose5() {
    this.contentdropdown5 = false;
  }
  basicUpdate(data: any) {}
  openModal() {
    this.modalContent1 = true;
    this.showModal = true;
    this.modalContent4 = false;
    this.modalContent5 = false;
  }
  openModal2() {
    this.modalContent4 = true;
    this.showModal = true;
    this.modalContent1 = false;
    this.modalContent5 = false;
  }
  closeModal() {
    this.showModal = false;
  }
  closeModal1(){
    this.showModal=false;
  }
  closeModal2() {
    this.showModal = false;
  }
  closeModal3() {
    this.showModal = false;
  }
  closeModal4() {
    this.showModal = false;
  }
  openModal4() {
    this.showModal = true;
    this.modalContent5 = true;
    this.modalContent1 = false;
    this.modalContent4 = false;
  }
  openModal5() {
    this.showModal = true;
    this.modalContent2 = true;
    this.modalContent1 = false;
    this.modalContent4 = false;
    this.modalContent5 = false;
  }
  managePassword() {
    this.isJobDetailsActive = false;
    this.isPasswordManagement = true;
    this.isPersonalDetailsActive = false;
    this.personaldetail = false;
    this.jobdetail = false;
  }
  showModal3: boolean = false;
  openModal3() {
    this.showModal3 = true;
    this.showModal = true;
  }

  closeModal8() {
    this.showModal3 = false;
    this.showModal = false;
  }
  onKeyUp(event): void {
    event.target.value = event.target.value.trim()

  }
   get pwd(){
    return this.passwordform.get("password");
   }
   get confirmpwd(){
    return this.passwordform.get("confirm")
   }
   searchValue:string = '';
   clearSearch() {
     this.searchValue = '';
   }


}
