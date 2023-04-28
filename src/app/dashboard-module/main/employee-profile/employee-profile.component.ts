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
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent {
  @Input() user: any;
  empForm: FormGroup;
  constructor(private dashService: DashService,private fb: FormBuilder,) {
    this.empForm = this.fb.group({
      employees: this.fb.array([]),
    })
  }
  employees(): FormArray {
    return this.empForm.get("employees") as FormArray
  }
  newEmployee(): FormGroup {
    return this.fb.group({
      excompany: '',
      exdesignation: '',
      exlocation:'',
      exduration:'',
    })
  }
  addEmployee() {
    console.log("Adding a employee");
    this.employees().push(this.newEmployee());
  }

  ngOnInit() {
    this.user = this.dashService.getSelectedEmployee();
  }

  selectedUser: any = {};
  personaldetail: boolean = true;
  jobdetail: boolean = false;
  showModal: boolean = false;
  modalContent1: boolean = false;
  modalContent2: boolean = false;
  modalContent4: boolean = false;
  modalContent5: boolean = false;
  modalContent6: boolean = false;
  modalContent7: boolean = false;
  isJobDetailsActive = false;
  isPersonalDetailsActive = true;
  employee: any = [];
  maritalStatus: string = '';
  bloodGroup: string = '';
  bankname: string = '';
  gender: string = '';
  jobdesignation: string = '';
  jobtiming: string = '';
  jobempstatus: string = '';
  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl(''),
    designation: new FormControl(''),
    dateOfJoining: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
    fatherName: new FormControl(''),
    motherName: new FormControl(''),
    maritalStatus: new FormControl(''),
    bloodGroup: new FormControl(''),
    nationality: new FormControl(''),
    matric: new FormControl(''),
    matricPercent: new FormControl(''),
    inter: new FormControl(''),
    interPercent: new FormControl(''),
    graduation: new FormControl(''),
    graduationStream: new FormControl(''),
    graduationCgpa: new FormControl(''),
    pg: new FormControl(''),
    pgStream: new FormControl(''),
    pgCgpa: new FormControl(''),
    employees:new FormArray([]),
    expcompany: new FormControl(''),
    expduration: new FormControl(''),
    explocation: new FormControl(''),
    expcompany1: new FormControl(''),
    expduration1: new FormControl(''),
    explocation1: new FormControl(''),
    expdesignation: new FormControl(''),
    expdesignation1: new FormControl(''),
    jobdesignation: new FormControl(''),
    joblocation1: new FormControl(''),
    jobtiming: new FormControl(''),
    jobctc: new FormControl(''),
    jobempstatus: new FormControl(''),
    joiningdate: new FormControl(''),
    bankname: new FormControl(''),
    adhaarno: new FormControl(''),
    accountno: new FormControl(''),
    ifsc: new FormControl(''),
    passport: new FormControl(''),
    panno: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    state: new FormControl(''),
    postalCode: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    profemail:new FormControl(''),
    yop:new FormControl(''),
    yop1:new FormControl(''),
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


  contentdropdown: boolean = false;
  contentdropdown2: boolean = false;
  contentdropdown3: boolean = false;
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
    // this.jobdesignation = arr.name;
    this.user.jobdesignation = arr.name;
  }
  Selectvariable2: string = 'Select Bank';
  colorvariable2: number = 0;
  Changeselect2(arr2: any) {
    this.Selectvariable2 = arr2.name;
    this.colorvariable2 = arr2.id;
    this.contentdropdown2 = false;
    console.log(arr2.name);
    this.bankname = arr2.name;
    this.user.bankname = arr2.name;
  }
  Selectvariable3: string = 'Select';
  colorvariable3: number = 0;

  Changeselect3(arr3: any) {
    this.Selectvariable3 = arr3.name;
    this.colorvariable3 = arr3.id;
    this.contentdropdown3 = false;
    console.log(arr3.name);
    // this.user['martialStatus'] = arr3.name;
    this.user.maritalStatus = arr3.name;
  }
  // Changeselect3(arr3: any) {
  //   this.Selectvariable3 = arr3.name;
  //   this.colorvariable3 = arr3.id;
  //   if (arr3.value === '') {
  //     this.Selectvariable3 = this.form.controls['maritalStatus'].value;
  //     this.colorvariable3 = this.array3.length; // Set the colorvariable3 to the index of the custom value in the array
  //     this.array3[this.colorvariable3] = {id: this.colorvariable3, name: this.Selectvariable3, value: this.Selectvariable3};
  //   }
  //   this.form.controls['maritalStatus'].setValue(this.Selectvariable3);
  //   this.form.controls['motherName'].setValue(this.form.controls['motherName'].value); // Set the value of the input field to itself to trigger change detection
  // }
  personaldetails() {
    this.personaldetail = true;
    this.jobdetail = false;
    this.isPersonalDetailsActive = true;
    this.isJobDetailsActive = false;
  }
  jobdetails() {
    this.jobdetail = true;
    this.personaldetail = false;
    this.isJobDetailsActive = true;
    this.isPersonalDetailsActive = false;
  }

  openmodal1(user: any) {
    this.showModal = true;
    this.fourthStep = false;
    this.selectedUser = { _id: user._id };
    this.form.patchValue(user);
    console.log('checkuser', this.selectedUser);
    this.Selectvariable3 = user.maritalStatus;
    this.Selectvariable4 = user.bloodGroup;
    this.Selectvariable1 = user.gender;
    this.Selectvariable = user.jobdesignation;
    this.Selectvariable8 = user.jobempstatus;
    this.Selectvariable5 = user.jobtiming;

    if (this.personaldetail === true) {
      this.modalContent1 = true;
      this.modalContent2 = false;
      this.modalContent4 = false;
      this.modalContent5 = false;
      this.modalContent6 = false;
      this.modalContent7 = false;
    } else if (this.jobdetail === true) {
      this.modalContent2 = true;
      this.modalContent1 = false;
      this.modalContent4 = false;
      this.modalContent5 = false;
      this.modalContent6 = false;
      this.modalContent7 = false;
    }
  }
  openmodal2(user: any) {
    this.fourthStep = false;
    this.showModal = true;
    this.modalContent4 = true;
    this.modalContent1 = false;
    this.modalContent5 = false;
    this.modalContent6 = false;
    this.modalContent7 = false;
    this.selectedUser = { _id: user._id };
    this.form.patchValue(user);
  }
  closeModal() {
    this.showModal = false;
  }
  fourthStep: boolean = false;

  successMessage: string;
  basicUpdate(data: any) {
    this.fourthStep = true;
    this.modalContent2 = false;
    this.modalContent1 = false;
    this.user.motherName = data.motherName;
    this.user.fatherName = data.fatherName;
    this.user.name = data.name;
    this.user.dateOfBirth = data.dateOfBirth;
    this.user.nationality = data.nationality;

    const updatedData = this.form.value;
    console.log('abc', data, this.user);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(this.user).subscribe(() => {
      console.log('Data updated successfully');
    });
    // this.user = updatedData;
  }
  closeModal2(data) {
    this.fourthStep = true;
    this.modalContent2 = false;
    this.modalContent1 = false;
    this.user.joblocation1 = data.joblocation1;
    this.user.jobctc = data.jobctc;

    const updatedData = this.form.value;
    console.log('abc', updatedData);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(this.user).subscribe(() => {
      console.log('Data updated successfully');
    });
    this.user = updatedData;
  }

  closeModal3(user: any) {
    this.fourthStep = true;
    this.modalContent1 = false;
    this.modalContent2 = false;
    this.modalContent4 = false;
    const updatedData = this.form.value;
    console.log('abc', updatedData);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(updatedData).subscribe(() => {
      console.log('Data updated successfully');
    });
    this.user = updatedData;
  }
  openModal3(user) {
    this.fourthStep = false;
    this.showModal = true;
    this.modalContent4 = false;
    this.modalContent1 = false;
    this.modalContent5 = true;
    this.modalContent6 = false;
    this.modalContent7 = false;
    this.selectedUser = { _id: user._id };
    this.form.patchValue(user);
    this.Selectvariable2 = user.bankname;
  }

  closeModal4(data) {
    this.fourthStep = true;
    this.modalContent1 = false;
    this.modalContent2 = false;
    this.modalContent4 = false;
    this.modalContent5 = false;
    this.user.accountno = data.accountno;
    this.user.ifsc = data.ifsc;
    this.user.adhaarno = data.adhaarno;
    this.user.panno = data.panno;
    this.user.passport = data.passport;
    const updatedData = this.form.value;
    console.log('abc', updatedData);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(this.user).subscribe(() => {
      console.log('Data updated successfully');
    });
    // this.user = updatedData;
  }
  openModal4(user) {
    this.fourthStep = false;
    this.showModal = true;
    this.modalContent4 = false;
    this.modalContent1 = false;
    this.modalContent5 = false;
    this.modalContent6 = true;
    this.modalContent7 = false;
    this.selectedUser = { _id: user._id };
    this.form.patchValue(user);
  }
  closeModal5(data) {
    this.fourthStep = true;
    this.modalContent1 = false;
    this.modalContent2 = false;
    this.modalContent4 = false;
    this.modalContent5 = false;
    this.modalContent6 = false;
    this.user.matric = data.accountno;
    this.user.matricPercent = data.matricPercent;
    this.user.inter = data.inter;
    this.user.interPercent = data.interPercent;
    this.user.pg = data.pg;
    this.user.pgCgpa = data.pgCgpa;
    this.user.pgStream = data.pgStream;
    this.user.graduation = data.graduation;
    this.user.graduationCgpa = data.graduationCgpa;
    this.user.graduationStream = data.graduationStream;

    const updatedData = this.form.value;
    console.log('abc', updatedData);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(this.user).subscribe(() => {
      console.log('Data updated successfully');
    });
    // this.user = updatedData;
  }
  openModal5(user) {
    this.fourthStep = false;
    this.showModal = true;
    this.modalContent4 = false;
    this.modalContent1 = false;
    this.modalContent5 = false;
    this.modalContent6 = false;
    this.modalContent7 = true;
    this.selectedUser = { _id: user._id };
    this.form.patchValue(user);
  }
  closeModal6(data) {
    this.fourthStep = true;
    this.modalContent1 = false;
    this.modalContent2 = false;
    this.modalContent4 = false;
    this.modalContent5 = false;
    this.modalContent6 = false;
    this.modalContent7 = false;
    const updatedData = this.form.value;
    console.log('abc', updatedData);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(updatedData).subscribe(() => {
      console.log('Data updated successfully');
    });
    this.user = updatedData;
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
    this.user.gender = arr1.name;
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
    this.user.bloodGroup = arr4.name;
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
    // this.jobtiming = arr5.name;
    this.user.jobtiming = arr5.name;
  }

  contentshow: boolean = false;
  addemployee() {
    this.contentshow = !this.contentshow;
  }
  contentdropdown8: boolean = false;
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
    this.user.jobempstatus = arr8.name;
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

  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.type.split('/')[0] !== 'image') {
      console.error('Invalid file type. Please select an image.');
      return;
    }
    this.onUpload(this.user)
  }
  onUpload(user): void {
    user['_id'] = this.user._id;
    this.dashService
      .upload(this.selectedFile, user._id)
      .then((res) => {
        console.log("file uploaded successfully")
      })
      .catch((err) => {
        console.log(err)

      });
    }
  viewMore:boolean=false;
  showbutton:boolean=true;
  showMoredata(){
    this.viewMore=!this.viewMore;
    this.showbutton=!this.showbutton;
  }
  hidedata(){
    this.viewMore=false;
    this.showbutton=true;
  }
  // openotherinput:boolean=false;
  // openInput() {
  //   if (this.array2.name==="Others"){
  //      this.openotherinput=true;
  //   }
  // }
}
