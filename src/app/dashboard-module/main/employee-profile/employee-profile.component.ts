import { Component, Input, OnInit } from '@angular/core';
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
export class EmployeeProfileComponent implements OnInit {
  @Input() user: any;
  empForm: FormGroup;
  // educationItems: any;
  constructor(
    private dashService: DashService,
    private fb: FormBuilder,
    private http: DashService
  ) {
    console.log(this.user);
  }

  employeeExperience: any[] = [];
  employeeId: string;

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
  showbutton: boolean = true;
  showAllData: boolean = false;
  showbutton1: boolean = true;
  showAllData1: boolean = false;
  isJobDetailsActive = false;
  isPersonalDetailsActive = true;
  employee: any = [];
  maritalStatus: string = '';
  bloodGroup: string = '';
  bankname: string = '';
  gender: string = '';
  designation: string = '';
  timing: string = '';
  job_type: string = '';
  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [
      Validators.pattern('[a-zA-Z ]+'),
      Validators.required,
    ]),
    designation: new FormControl(''),
    dateOfJoining: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
    fatherName: new FormControl('', [
      Validators.pattern('[a-zA-Z ]+'),
      Validators.required,
    ]),
    motherName: new FormControl('', [
      Validators.pattern('[a-zA-Z ]+'),
      Validators.required,
    ]),
    maritalStatus: new FormControl(''),
    bloodGroup: new FormControl(''),
    nationality: new FormControl(''),
    matric: new FormControl(''),
    matricPercent: new FormControl(''),
    inter: new FormControl('', [
      Validators.pattern(/^\d+(\.\d{1,2})?%?$/),
      Validators.required,
    ]),
    interPercent: new FormControl('', [
      Validators.pattern(/^\d+(\.\d{1,2})?%?$/),
    ]),
    // graduation: new FormControl(''),
    // graduationStream: new FormControl(''),
    // graduationCgpa: new FormControl(''),
    pg: new FormControl(''),
    pgStream: new FormControl(''),
    pgCgpa: new FormControl(''),
    employees: new FormArray([]),
    expcompany: new FormControl(''),
    expduration: new FormControl(''),
    explocation: new FormControl(''),
    expcompany1: new FormControl(''),
    expduration1: new FormControl(''),
    explocation1: new FormControl(''),
    expdesignation: new FormControl(''),
    jobdesignation: new FormControl(''),
    location: new FormControl(''),
    timing: new FormControl(''),
    ctc: new FormControl(''),
    job_type: new FormControl(''),
    bankname: new FormControl(''),
    adhaarno: new FormControl('', [
      Validators.pattern(/^[2-9]{1}[0-9]{11}$/),
      Validators.required,
    ]),
    accountno: new FormControl(''),
    ifsc: new FormControl('', [
      Validators.pattern(/^([A-Z]{4}[0]{1}[A-Z0-9]{6})$/),
      Validators.required,
    ]),
    otherbankname: new FormControl(''),
    passport: new FormControl('', [
      Validators.pattern('[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$'),
      Validators.required,
    ]),
    panno: new FormControl('', [
      Validators.pattern(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/),
      Validators.required,
    ]),
    mobile: new FormControl('', [
      Validators.pattern('[6-9]{1}[0-9]{9}'),
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{1,63}$'),
      Validators.required,
    ]),
    state: new FormControl('', [
      Validators.pattern('[a-zA-Z ]+'),
      Validators.required,
    ]),
    postalCode: new FormControl('', [
      Validators.pattern(/^[0-9]{6}$/),
      Validators.required,
    ]),
    city: new FormControl('', [
      Validators.pattern('[a-zA-Z ]+'),
      Validators.required,
    ]),
    address: new FormControl(''),
    professionalemail: new FormControl(''),
    matricpassing: new FormControl(''),
    interpassing: new FormControl(''),
    phdcol: new FormControl(''),
    phdstream: new FormControl(''),
    phdsgpa: new FormControl(''),
  });

  experienceForm: FormGroup;
  educationForm: FormGroup;
  experienceItems: FormArray;
  educationItems: FormArray;

  get registrationFormControl() {
    return this.form.controls;
  }
  ngOnInit() {
    this.user = this.dashService.getSelectedEmployee();
    console.log('select', this.user);

    // --------------------EXPERIENCE FORM ARRAY----------------------//
    this.experienceForm = new FormGroup({
      experienceItems: new FormArray([]),
    });

    this.experienceItems = this.experienceForm.get(
      'experienceItems'
    ) as FormArray;

    if (
      this.user &&
      this.user.experienceItems &&
      this.user.experienceItems.length > 0
    ) {
      this.user.experienceItems.forEach((item) => {
        this.addItem();
      });
    } else {
      this.addItem();
    }

    // --------------------EDUCATION FORM ARRAY----------------------//
    this.educationForm = new FormGroup({
      educationItems: new FormArray([]),
    });

    this.educationItems = this.educationForm.get('educationItems') as FormArray;

    if (
      this.user &&
      this.user.educationItems &&
      this.user.educationItems.length > 0
    ) {
      this.user.educationItems.forEach((item) => {
        this.addeducation();
      });
    } else {
      this.addeducation();
    }
  }

  createEducationItem(item?: any): FormGroup {
    return new FormGroup({
      college: new FormControl(item?.college || ''),
      cgpa: new FormControl(item?.cgpa || ''),
      passing: new FormControl(item?.passing || ''),
      stream: new FormControl(item?.stream || ''),
    });
  }
  createExperienceItem(item?: any): FormGroup {
    return new FormGroup({
      expcompany: new FormControl(item?.expcompany || ''),
      expduration: new FormControl(item?.expduration || ''),
      explocation: new FormControl(item?.explocation || ''),
      expdesignation: new FormControl(item?.expdesignation || ''),
    });
  }

  addeducation() {
    this.educationItems.push(this.createEducationItem());
    console.log(this.educationForm.value);
  }
  addItem() {
    this.experienceItems.push(this.createExperienceItem());
    console.log(this.experienceForm.value);
  }
  removeItem(index: number) {
    this.experienceItems.removeAt(index);
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
  array9: any = [
    {
      id: 0,
      name: 'Graduation Details',
    },
    {
      id: 1,
      name: 'Post-Graduation Details',
    },
    {
      id: 2,
      name: 'Phd-Details',
    },
  ];

  contentdropdown: boolean = false;
  contentdropdown2: boolean = false;
  contentdropdown3: boolean = false;
  contentdropdown10: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  dropdownOpen2() {
    this.contentdropdown2 = !this.contentdropdown2;
  }
  dropdownOpen3() {
    this.contentdropdown3 = !this.contentdropdown3;
  }
  dropdownOpen10() {
    this.contentdropdown10 = !this.contentdropdown10;
    console.log('working', this.contentdropdown10);
  }
  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
    // this.jobdesignation = arr.name;
    this.user.designation = arr.name;
  }
  Selectvariable9: string = '';
  colorvariable9: number = 0;
  Changeselect9(arr9: any) {
    this.Selectvariable9 = arr9.name;
    this.colorvariable9 = arr9.id;
    this.contentdropdown10 = false;
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
    if (this.colorvariable2 === 5) {
      this.Selectvariable2 = 'Others';
    }
  }
  Selectvariable3: string = 'Select';
  colorvariable3: number = 0;

  Changeselect3(arr3: any) {
    this.Selectvariable3 = arr3.name;
    this.colorvariable3 = arr3.id;
    this.contentdropdown3 = false;
    console.log(arr3.name);
    this.user.maritalStatus = arr3.name;
  }
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
    this.Selectvariable = user.designation;
    this.Selectvariable8 = user.job_type;
    this.Selectvariable5 = user.timing;

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
  loader: boolean = false;
  successMessage: string;
  basicUpdate(data: any) {
    this.fourthStep = true;
    this.loader = true;
    this.modalContent2 = false;
    this.user.motherName = data.motherName;
    this.user.fatherName = data.fatherName;
    this.user.name = data.name;
    this.user.dateOfBirth = data.dateOfBirth;
    this.user.nationality = data.nationality;
    this.modalContent1 = true;
    const updatedData = this.form.value;
    console.log('abc', data, this.user);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(this.user).subscribe(
      (res: any) => {
        console.log('Data updated successfully');
        this.loader = false;
        this.modalContent1 = false;
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }
  closeModal2(data) {
    this.loader = true;
    // this.fourthStep = true;
    this.modalContent2 = true;
    this.modalContent1 = false;
    this.user.location = data.location;
    this.user.ctc = data.ctc;
    const updatedData = this.form.value;
    console.log('abc', updatedData);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(this.user).subscribe(
      () => {
        console.log('Data updated successfully');
        this.loader = false;
        this.modalContent2 = false;
        this.fourthStep = true;
      },
      (error: any) => {
        console.log('error', error);
      }
    );
    // this.user = updatedData;
  }

  closeModal3(data: any) {
    // this.fourthStep = true;
    this.modalContent1 = false;
    this.modalContent2 = false;
    this.modalContent4 = true;
    this.loader = true;
    this.user.state = data.state;
    this.user.address = data.address;
    this.user.postalCode = data.postalCode;
    this.user.email = data.email;
    this.user.mobile = data.mobile;
    this.user.city = data.city;
    const updatedData = this.form.value;
    console.log('abc', updatedData);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(this.user).subscribe(
      () => {
        console.log('Data updated successfully');
        this.loader = false;
        this.modalContent4 = false;
        this.fourthStep = true;
      },
      (error: any) => {
        console.log('error', error);
      }
    );
    // this.user = updatedData;
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
    this.loader = true;
    this.modalContent1 = false;
    this.modalContent2 = false;
    this.modalContent4 = false;
    this.modalContent5 = true;
    this.user.accountno = data.accountno;
    this.user.ifsc = data.ifsc;
    this.user.otherbankname = data.otherbankname;
    this.user.adhaarno = data.adhaarno;
    this.user.panno = data.panno;
    this.user.passport = data.passport;
    const updatedData = this.form.value;
    console.log('abc', updatedData);
    updatedData['_id'] = this.user._id;
    this.dashService.updateEmployee(this.user).subscribe((res) => {
      console.log('Data updated successfully');
      this.loader = false;
      this.modalContent5 = false;
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
    this.educationForm.patchValue(user);
  }

  closeModal5(data) {
    this.modalContent1 = false;
    this.modalContent2 = false;
    this.modalContent4 = false;
    this.modalContent5 = false;
    this.modalContent6 = true;
    this.loader = true;
    this.user.educationItems = data.educationItems;
    const updatedData = {
      _id: this.user._id,
      educationItems: this.user.educationItems,
    };
    this.dashService.updateEmployee(updatedData).subscribe(() => {
      console.log('Data updated successfully');
      this.modalContent6 = false;
      this.loader = false;
      this.fourthStep = true;
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
    this.experienceForm.patchValue(user);
    this.user();
  }
  closeModal6(data) {
    this.modalContent1 = false;
    this.modalContent2 = false;
    this.modalContent4 = false;
    this.modalContent5 = false;
    this.modalContent6 = false;
    this.modalContent7 = true;
    this.loader = true;
    this.user.experienceItems = data.experienceItems;
    const updatedData = {
      _id: this.user._id,
      experienceItems: this.user.experienceItems,
    };
    this.dashService.updateEmployee(updatedData).subscribe((res) => {
      console.log('experience', res);
      this.modalContent7 = false;
      this.loader = false;
      this.fourthStep = true;
    });
    // this.user = updatedData;
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
    this.user.timing = arr5.name;
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
    // this.job_type=arr8.name
    this.user.job_type = arr8.name;
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
  dropdownClose10() {
    this.contentdropdown10 = false;
  }

  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.type.split('/')[0] !== 'image') {
      console.error('Invalid file type. Please select an image.');
      return;
    }
    this.progress = true;
    this.onUpload(this.user);
  }

  upload: boolean = false;
  progress: boolean = false;
  imageurl: any;
  onUpload(user) {
    user['_id'] = this.user._id;
    this.dashService.upload(this.selectedFile, user._id).then((res: any) => {
      this.upload = true;
      this.progress = false;
      this.imageurl = this.dashService.fileUrl;
      console.log('img', this.imageurl);
    });
  }

  //VIEW MORE AND VIEW LESS
  showMoredata() {
    this.showAllData = true;
    this.showbutton = false;
  }
  showMoredata1() {
    this.showAllData1 = true;
    this.showbutton1 = false;
  }

  hidedata() {
    this.showAllData = false;
    this.showbutton = true;
  }
  hidedata1() {
    this.showAllData1 = false;
    this.showbutton1 = true;
  }

  showpgdetails: boolean = false;
  showpgdet() {
    this.showpgdetails = true;
  }

  //Validation
  allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
  validatePincode(event: KeyboardEvent) {
    const pincode = (event.target as HTMLInputElement).value;
    if (!this.allowedKeys.includes(event.key) && !/^\d{0,5}$/.test(pincode)) {
      event.preventDefault();
    }
  }

  validateAddhar(event: KeyboardEvent) {
    const adhaarno = (event.target as HTMLInputElement).value;
    if (!this.allowedKeys.includes(event.key) && !/^\d{0,11}$/.test(adhaarno)) {
      event.preventDefault();
    }
  }

  //ARRAY Form
}
