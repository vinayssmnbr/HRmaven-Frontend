import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { DashService } from '../../shared/dash.service';
import { DOCUMENT } from '@angular/common';
import { error, log } from 'console';
import { CookieService } from 'ngx-cookie-service';

import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-content',
  templateUrl: './employee-content.component.html',
  styleUrls: ['./employee-content.component.css'],
})
export class EmployeeContentComponent implements OnInit {
  // user:any;
  isChecked: boolean = true;
  isfetched: boolean = false;
  users: any[] = [];
  items: any[] = [];
  selected: any[] = [];
  selectAll: boolean = false;
  parentSelector: boolean = false;
  employee: any = [];
  statusFilter: string = 'all';
  selectedEmployess: any[] = [];
  selectedEmployee: any;
  designationdropdownOption: boolean = false;
  name: any;
  email: any;
  fileName: string = '';
  fileName1: string = '';
  isSelectDisabled = false;
  emailValidationMessage: string = '';
  mobile: number;
  progressBar: any;
  progressText: any;
  progress: number = 0;
  interval: any;
  countCard = 0;
  selectAllChecked: boolean = false;
  doneClicked: boolean = false;
  csvForm: FormGroup;
  importFileResponse: any = { success: [], error: [] };
  constructor(
    public dashService: DashService,
    private formBuilder: FormBuilder,

    @Inject(DOCUMENT) public document: Document,
    private cookie: CookieService
  ) {
    dashService.activeComponent = 'employees';
    dashService.headerContent = '';
  }

  buttonbackgroundColor = '#2F2C9F';
  buttonColor = '#FFFFFF';
  buttonbackgroundColor2 = '#ECECEC';
  buttonColor2 = '#2F2C9F';
  buttonbackgroundColor3 = '#2F2C9F';
  buttonColor3 = '#FFFFFF';
  // employee: any = [];
  employeeuid: any = [];
  currentEmployeeUid: any = '';
  query: string = '';
  designation: string = '';
  gender: string = '';
  bankname: string = '';
  location: string = '';
  timing: string = '';
  job_type: string = '';

  data: any;
  deletedata: any;
  empdesignation = '';
  employeeid: any;
  show: any = false;
  emptybox: boolean = false;
  nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const valid = nameRegex.test(control.value);
    return valid ? null : { invalidName: true };
  }
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      this.nameValidator,
      Validators.pattern('[a-zA-Z ]+'),
    ]),
    designation: new FormControl('', Validators.required),
    uid: new FormControl(this.currentEmployeeUid),
    job_type: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    dateOfJoining: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    ctc: new FormControl('', Validators.required),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('[6-9]{1}[0-9]{9}'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{1,63}$'),
    ]),
    timing: new FormControl('', Validators.required),
  });
  csvform = new FormGroup({
    csv: new FormControl('', Validators.required),
  });
  get registrationFormControl() {
    return this.form.controls;
  }
  // validateFileType(control: AbstractControl) {
  //   const url = control.value;
  //   const fileType = url.type;
  //   if (
  //     !fileType.includes("jpeg") &&
  //     !fileType.includes("jpg") &&
  //     !fileType.includes("png")
  //   ) {
  //     return { invalidFileType: true };
  //   }
  //   return null;
  // }

  // validateFileSize(control: AbstractControl) {
  //   const url = control.value;
  //   const fileSize = url.size / 1024 / 1024; // in MB
  //   if (fileSize > 5) {
  //     return { maxSize: true };
  //   }
  //   return null;
  // }

  selectEmployee(user: any) {
    this.dashService.setSelectedEmployee(user);
  }
  //ADD DATA
  // file: File | null = null;
  progress1: boolean = true;
  loading: boolean = false;
  submit() {
    if (this.Selectvariable2 != '' && this.Selectvariable3 != '') {
      this.loading = true;
      this.doneClicked = true;
      if (this.form.invalid) return;
      console.log(this.form.value);
      let data = this.form.value;
      data['hrid'] = this.cookie.get('hr_id');
      this.showModalContent = true;
      this.fourthStep = true;
      this.thirdStep = false;
      data.designation = this.designation;
      data.location = this.location;
      data.timing = this.timing;
      data.job_type = this.job_type;
      this.dashService.addEmployee(data).subscribe((result) => {
        this.dashService.addEmployee(this.form);
        this.loading = false;
        this.showModalContent = false;

        this.fetchdata();
        this.form.reset();
      });
    }
  }

  form1Valid: boolean = this.form.controls.name.valid;

  //GET DATA
  loaderz: boolean = false;
  fetchdata() {
    this.loaderz = true;
    this.dashService.getEmployee().subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
      this.loaderz = false;
      this.isfetched = true;
      if (res.length > 0) {
        this.emptybox = false;
      }
    });
  }

  //DELETE DATA
  todelete(data: any) {
    this.rowdelete = true;
    this.showModalContent = false;
    this.showModal = true;
    this.deletemessage = false;
    this.deletedata = data;
  }
  //SEARCH UID
  // search(event) {
  //   console.log(this.query, 'search fn', this.designation);
  //   this.dashService
  //     .searchuid(this.query, this.designation)
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.employee = res;
  //       console.log('data', res);
  //     });
  //   if (event.keyCode === 32) {
  //     this.query = '';

  //   }
  // }

  function() {
    this.show = !this.show;
  }
  openDatePicker() {
    let input = document.getElementById('text4') as HTMLInputElement;
    input.click();
  }

  opendpdtn = false;
  ngOnInit() {
    this.fetchdata();
    this.employeefilter();
    this.csvForm = this.formBuilder.group({
      csv: [''],
    });

    // this.progressBar = document.getElementsByClassName('progress');
    // this.progressText = document.getElementsByClassName('progress-text');

    // this.interval = setInterval(() => {
    //   this.progress++;
    //   if (this.progress > 100) {
    //     this.progress = 0;
    //   }
    //   this.progressBar[0].style.width = `${this.progress}%`;
    //   this.progressText[0].innerText = `${this.progress}%`;
    // }, 50);

    // this.dashService.getEmployeeEmail(this.abc).subscribe((response:any)=>{
    //   console.log("hello",response)

    // })
  }
  abc: any = 'Harpreetsingh@yahoo.com';

  emailExists = false;

  emailId: any;
  checkEmailExists() {
    this.emailId = this.form.controls['email'].value;

    console.log('sh', this.emailId);
    this.dashService
      .getEmployeeEmail(this.emailId)
      .subscribe((response: any) => {
        console.log('check', response);
        if (response.flag) {
          this.emailExists = true;
          console.log(response.message);
        } else {
          this.emailExists = false;
          console.log(response.message);
        }
      });
  }

  mobileExists = false;

  mobileNo: any;
  checkmobileExists() {
    this.mobileNo = this.form.controls['mobile'].value;

    console.log('sh', this.mobileNo);
    this.dashService
      .getEmployeeMobile(this.mobileNo)
      .subscribe((response: any) => {
        console.log('check', response);
        if (response.flag) {
          this.mobileExists = true;
          console.log(response.message);
        } else {
          this.mobileExists = false;
          console.log(response.message);
        }
      });
  }

  changeColor() {
    this.buttonbackgroundColor =
      this.buttonbackgroundColor === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
    this.buttonColor = this.buttonColor === '#FFFFFF' ? '#2F2C9F' : '#FFFFFF';
  }

  changeColor2() {
    this.buttonbackgroundColor2 =
      this.buttonbackgroundColor2 === '#ECECEC' ? '#2F2C9F' : '#ECECEC';
    this.buttonColor2 = this.buttonColor2 === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
    this.Changeselect({ name: 'ALL' });
    this.query = '';
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  emailAlreadyExists = false;
  firstStep: boolean = true;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  fourthStep: boolean = false;
  showModalContent: boolean = true;
  fifthstep: boolean = false;

  emailvar: any;
  onNextForm() {
    if (this.Selectvariable1 != '' && this.Selectvariable6 != '') {
      this.firstStep = false;
      this.secondStep = true;
      this.onUpload(this.selectedFile);
    }
    // this.dashService.getEmployeeEmail(this.form.controls['email'].value).subscribe((response:any)=>{
    //   console.log("response",this.emailAlreadyExists)
    //   this.emailvar=response.email
    //   // if (!emailvar) {
    //   // this.emailAlreadyExists = response.exists;
    //   // console.log("error")

    //   // }
    // })
  }

  onPreviousForm() {
    console.log(this.form.value);
    this.firstStep = true;
    this.secondStep = false;
  }
  nextForm1() {
    this.secondStep = false;
    this.thirdStep = true;
  }
  previousForm1() {
    this.secondStep = true;
    this.thirdStep = false;
  }
  showModal = false;
  closeModal() {
    this.showModal = false;
    this.buttonbackgroundColor3 =
      this.buttonbackgroundColor3 === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
    this.buttonColor3 = this.buttonColor3 === '#FFFFFF' ? '#2F2C9F' : '#FFFFFF';
    this.showModalContent = true;
    this.fourthStep = false;
    this.form.reset();
  }

  openModal() {
    this.showModal = true;
    this.firstStep = true;
    this.secondStep = false;
    this.thirdStep = false;
    this.showModalContent = true;
    //DYNAMIC UID
    this.dashService.getEmployeeUid().subscribe((res: any) => {
      console.log('data', res);
      this.currentEmployeeUid = res.uid;
    });
  }
  rowdelete = false;

  closeModal2() {
    this.showModal = false;
    this.rowdelete = false;
    this.deletemessage = false;
  }
  deletemessage = false;
  successdelete() {
    let data = this.deletedata;
    this.dashService.deleteStudent(data._id).subscribe(() => {
      console.log('deleted');
      this.employee = this.employee.filter((s) => s !== data);
    });
    this.deletemessage = true;
    this.rowdelete = false;
    this.showModal = true;
    // this.fetchdata();
    // this.ngOnInit();
  }
  closeModal3() {
    this.showModal = false;
  }
  nextForm2() {}
  array: any = [
    {
      id: 0,
      name: 'All',
    },
    {
      id: 1,
      name: 'Frontend Developer',
    },
    {
      id: 2,
      name: 'Full Stack Developer',
    },
    {
      id: 3,
      name: 'UI/UX Designer',
    },
    {
      id: 4,
      name: 'Quality Analyst',
    },
    {
      id: 6,
      name: 'Software Developer',
    },
  ];
  array6: any = [
    {
      id: 0,
      name: 'Frontend Developer',
    },
    {
      id: 1,
      name: 'Full Stack Developer',
    },
    {
      id: 2,
      name: 'UI/UX Designer',
    },
    {
      id: 3,
      name: 'Quality Analyst',
    },
    {
      id: 4,
      name: 'Software Developer',
    },
  ];
  array1: any = [
    {
      id: 0,
      name: 'Full-Time',
    },
    {
      id: 1,
      name: 'Part-Time',
    },
    {
      id: 2,
      name: 'Internship',
    },
  ];
  array2: any = [
    {
      id: 0,
      name: 'Mohali',
    },
    {
      id: 1,
      name: 'Gurugram',
    },
    {
      id: 2,
      name: 'Pune',
    },
    {
      id: 3,
      name: 'Hyderabad',
    },
    {
      id: 4,
      name: 'Bangalore',
    },
  ];
  array3: any = [
    {
      id: 0,
      name: '9.00am to 5:00pm',
    },
    {
      id: 1,
      name: '9.00am to 6:00pm',
    },
    {
      id: 2,
      name: '10.00am to 5:00pm',
    },
    {
      id: 3,
      name: '10.00am to 6:00pm',
    },
  ];
  array4: any = [
    {
      id: 0,
      name: 'Active',
    },
    {
      id: 1,
      name: 'Terminated',
    },
    {
      id: 2,
      name: 'Resigned',
    },
    {
      id: 3,
      name: 'Absconder',
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
  contentdropdown2: boolean = false;
  dropdownOpen2() {
    this.contentdropdown2 = !this.contentdropdown2;
  }
  contentdropdown3: boolean = false;
  dropdownOpen3() {
    this.contentdropdown3 = !this.contentdropdown3;
  }
  contentdropdown4: boolean = false;
  dropdownOpen4() {
    this.contentdropdown4 = !this.contentdropdown4;
  }
  Selectvariable: any = 'Designation';
  colorvariable: number = 0;
  Selectvariable1: string = '';
  colorvariable1: number = 0;
  Selectvariable2: string = '';
  colorvariable2: number = 0;
  Selectvariable3: string = '';
  colorvariable3: number = 0;
  Selectvariable6: string = '';
  colorvariable6: number = 0;
  Selectvariable4: string = '';
  colorvariable4: number = 0;
  Changeselect4(arr4: any) {
    this.Selectvariable4 = arr4.name;
    this.colorvariable4 = arr4.id;
    this.contentdropdown4 = false;
  }
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
    this.designation = arr.name;
    console.log('str', this.designation);

    // this.dashService
    //   .searchuid(this.query, this.designation == 'All' ? '' : this.designation)
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.employee = res;
    //     console.log('data', res);
    //   });
  }

  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.colorvariable1 = arr1.id;
    this.contentdropdown1 = false;
    this.job_type = arr1.name;
    console.log(arr1.name);
  }
  Changeselect2(arr2: any) {
    this.Selectvariable2 = arr2.name;
    this.colorvariable2 = arr2.id;
    this.contentdropdown2 = false;
    console.log(arr2.name);
    this.location = arr2.name;
  }
  // for(let i=0; i)
  Changeselect6(arr6: any) {
    this.Selectvariable6 = arr6.name;
    this.colorvariable6 = arr6.id;
    this.contentdropdown3 = false;
    console.log(arr6.name);
    this.designation = arr6.name;
  }
  Changeselect3(arr3: any) {
    this.Selectvariable3 = arr3.name;
    this.colorvariable3 = arr3.id;
    this.contentdropdown3 = false;
    console.log(arr3.name);
    this.timing = arr3.name;
  }
  dropdownClose() {
    this.contentdropdown = false;
  }
  dropdownClose3() {
    this.contentdropdown3 = false;
  }
  dropdownClose1() {
    this.contentdropdown1 = false;
  }
  dropdownClose2() {
    this.contentdropdown2 = false;
  }

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }

  Space(event: any) {
    if (event.target.selectionStart === 0 && event.code == 'Space') {
      event.preventDefault();
    }
  }

  validateEmail(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement).value.trim();
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
  validatePhoneNumber(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
    const phoneNumber = (event.target as HTMLInputElement).value;
    if (!allowedKeys.includes(event.key) && !/^\d{0,9}$/.test(phoneNumber)) {
      event.preventDefault();
    }
  }

  selectedFile: File | null = null;
  selectedFile1: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const maxAllowedSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
    if (!allowedTypes.includes(this.selectedFile.type)) {
      this.fileName = null;
    }
    if (this.selectedFile.size > maxAllowedSize) {
      this.fileName = '';
    }
    if (this.selectedFile.type.split('/')[0] !== 'image') {
      console.error('Invalid file type. Please select an image.');
      return;
    }
    // this.onUpload(  this.selectedFile );
  }
  onUpload(file) {
    console.log('fdjkhf');
    this.dashService.upload1(file).then(
      (res) => {
        this.form.patchValue({
          url: res && res.url,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loader: boolean = false;
  onFileSelected1(event: any): void {
    this.selectedFile1 = event.target.files[0];
    console.log('yyyyy', this.selectedFile1);
    // this.fileName1 = this.selectedFile1 ? this.selectedFile1.name : '';
    this.loader = true;
  }
  tableview: boolean = true;
  tableviewcall() {
    this.tableview = true;
    this.cardview = false;
  }
  cardview: boolean = false;
  cardviewcall() {
    this.cardview = true;
    this.tableview = false;
  }
  selectall: boolean = false;
  selectboxes() {
    this.selectall = !this.selectall;
  }
  isallactive: boolean = true;
  isall() {
    this.isallactive = !this.isallactive;
    this.is_active = false;
    this.is_absconder = false;
    this.is_terminated = false;
    this.is_resigned = false;
    this.fetchdata();
  }
  is_active: boolean = false;
  isactive() {
    this.is_active = !this.is_active;
    this.isallactive = false;
    this.is_absconder = false;
    this.is_terminated = false;
    this.is_resigned = false;
    this.dashService.getEmployeeStatus('active').subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
    });
  }
  is_resigned: boolean = false;
  is_terminated: boolean = false;
  is_absconder: boolean = false;
  isresigned() {
    this.is_resigned = !this.is_resigned;
    this.is_absconder = false;
    this.is_terminated = false;
    this.is_active = false;
    this.isallactive = false;
    this.dashService.getEmployeeStatus('resigned').subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
    });
  }
  isterminated() {
    this.is_terminated = !this.is_terminated;
    this.is_absconder = false;
    this.is_resigned = false;
    this.is_active = false;
    this.isallactive = false;
    this.dashService.getEmployeeStatus('terminated').subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
    });
  }
  isabsconder() {
    this.is_absconder = !this.is_absconder;
    this.is_resigned = false;
    this.is_terminated = false;
    this.is_active = false;
    this.isallactive = false;
    this.dashService.getEmployeeStatus('absconder').subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
    });
  }
  iscolorgreen: boolean = false;
  iscoloryellow: boolean = false;
  iscolorred: boolean = false;
  iscolorbrown: boolean = false;
  colorred() {
    this.iscolorred = !this.iscolorred;
  }
  colorgreen() {
    this.iscolorgreen = !this.iscolorgreen;
  }
  coloryellow() {
    this.iscoloryellow = !this.iscoloryellow;
  }
  colorbrown() {
    this.iscolorbrown = !this.iscolorbrown;
  }
  selectedOption: string;

  selectedUser: any;
  optionStyle: any;
  isstatus: boolean = false;
  showpopup: string = '';
  onSelectChange(event: any, user: any) {
    this.isstatus = true;
    setTimeout(() => {
      this.isstatus = false;
    }, 3000);
    switch (event.target.value) {
      case 'active': {
        this.optionStyle = {
          'background-color': 'rgba(123, 211, 109, 0.3)',
          color: '#3D9030',
          border: 'rgba(123, 211, 109, 0.3)',
        };
        this.showpopup = 'Status changed to Active';
        break;
      }
      case 'terminated': {
        this.optionStyle = {
          'background-color': 'rgba(250, 151, 150, 0.2)',
          color: '#CB1E0F',
          border: 'rgba(250, 151, 150, 0.2)',
        };
        this.showpopup = 'Status changed to Terminated';
        break;
      }
      case 'resigned': {
        this.optionStyle = {
          'background-color': '#EFEFF8',
          color: '#2f2c9f',
          border: '#EFEFF8',
        };
        this.showpopup = 'Status changed to Resigned';
        break;
      }
      case 'absconder': {
        this.optionStyle = {
          'background-color': 'rgba(248, 187, 111, 0.4)',
          color: '#DB771D',
          border: 'rgba(248, 187, 111, 0.4)',
        };
        this.showpopup = 'Status changed to Absconder';
        break;
      }
      default: {
        this.optionStyle = {
          // 'width':'110px',
        };
        this.showpopup = '';
        break;
      }
    }
    user.status = event.target.value;
    this.selectedUser = user._id;

    this.dashService.updateEmpStatus(user._id, event.target.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // const index: number = this.data.indexOf(msg);
  // if (index !== -1) {
  //     this.data.splice(index, 1);
  // }

  selectUser(user) {
    this.selectedUser = user;
    this.optionStyle = {};
  }

  getStatusStyle(user) {
    if (user.status === 'active') {
      return {
        'background-color': 'rgba(123, 211, 109, 0.3)',
        color: '#3D9030',
        border: 'rgba(123, 211, 109, 0.3)',
      };
    } else if (user.status === 'terminated') {
      return {
        'background-color': 'rgba(250, 151, 150, 0.2)',
        color: '#CB1E0F',
        border: 'rgba(250, 151, 150, 0.2)',
      };
    } else if (user.status === 'resigned') {
      return {
        'background-color': '#EFEFF8',
        color: '#2f2c9f',
        border: '#EFEFF8',
      };
    } else if (user.status === 'absconder') {
      return {
        'background-color': 'rgba(248, 187, 111, 0.4)',
        color: '#DB771D',
        border: 'rgba(248, 187, 111, 0.4)',
      };
    } else {
      return {};
    }
  }

  importfile: boolean = false;
  csvadded: boolean = false;
  openImport() {
    this.importfile = true;
    this.showModal = true;
    this.showModalContent = false;
    this.csvadded = false;
    // this.importFile()
  }
  closeFilepicker() {
    this.importfile = false;
    this.showModal = false;
    this.csvadded = false;
  }

  employeecsv() {
    this.csvadded = true;
    this.importfile = false;
  }

  closecsvadded() {
    this.showModal = false;
    this.csvadded = false;
    this.fetchdata();
  }

  inavlidModal: boolean = true;
  closeModal5() {
    this.inavlidModal = false;
    this.showModal = false;
  }

  download(): void {
    // if (this.selectedEmployess && this.selectedEmployess.length > 0) {
    this.dashService.exportUsers(this.selectedEmployess).subscribe(
      (data: Blob) => {
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'users.csv';
        link.click();
      },
      (error) => console.log(error)
    );
    // }
  }

  waitThreeSeconds() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Done!');
      }, 6000);
    });
  }

  async onFileSelectedrem(event: any) {
    const file: File = event.files[0];
    // this.loader = true;
    if (!file) {
      console.log('No file selected.');
      return;
    }

    let errors = [];
    let sucesses = [];
    if (!validateCsvFile(file)) {
      alert('Invalid file type. Please select a CSV file.');
      return;
    } else {
      this.loader = true;
    }

    function validateCsvFile(file: File): boolean {
      if (file.name.toLowerCase().slice(-3) === 'csv') {
        return true;
      } else {
        return false;
      }
    }

    // Check file size
    const MAX_FILE_SIZE_BYTES = 500000000; // 500MB in bytes
    if (file.size > MAX_FILE_SIZE_BYTES) {
      console.log('Selected file is too large.');
      return;
    }

    // Parse CSV file
    const reader: FileReader = new FileReader();

    reader.onloadstart = () => {
      console.log('Please wait, file is uploading...');
    };

    reader.onload = (e: any) => {
      const csv: string = e.target.result;
      const lines: string[] = csv.split(/\r\n|\n/);
      const headers: string[] = lines[0].split(',');
      const data: any[] = [];

      for (let i = 1; i < lines.length - 1; i++) {
        const values: string[] = lines[i].split(',');
        const item: any = {};

        for (let j = 0; j < headers.length; j++) {
          item[headers[j]] = values[j];
        }
        data.push(item);
      }

      console.log(data, 'parsed CSV data');
      // if(data.length==0) return 'no user selected'

      if (data.length === 0) {
        // alert('Your CSV file was not filled properly,So user cannot selected this type of csv file');
        return;
      }

      let uid: number = -1;
      let numSuccesses = 0;
      let numFailures = 0;
      let responseArr = [];
      this.dashService.getEmployeeUid().subscribe((res: any) => {
        uid = res.uid;
        console.log(res, 'uid response');
        console.log(res.message);
        if (uid == -1) return 'there is an error while getting uid';
        let increaseBy: number = 100 / data.length;
        data.forEach((employee) => {
          console.log('Adding employee:', employee);
          employee['uid'] = uid++;
          this.dashService.addEmployee(employee).subscribe(
            async (res: any) => {
              console.log('res', res);
              console.log('messagge', res.message);
              this.loader = true;
              responseArr.push(res);
              console.log('Data:', res.data);
              if (res.status == 'failed') {
                numFailures++;
                errors.push({ ...employee, error: res.message });
              } else if (res.status == 'Success') {
                numSuccesses++;
                sucesses.push(res);
              }
              if (responseArr.length == data.length) {
                await this.waitThreeSeconds();
                this.loader = false;
                this.csvadded = true;
                this.importfile = false;
                console.log('not uploaded files', errors);
                this.importFileResponse.error = [...errors];
                this.importFileResponse.sucess = [...sucesses];
                this.importFileResponse.numSuccesses = numSuccesses;
                this.importFileResponse.numFailures = numFailures;
              }
            },
            async (error: any) => {
              numFailures++;
              errors.push({ ...employee, error });
              responseArr.push(employee);
              if (responseArr.length == data.length) {
                await this.waitThreeSeconds();
                this.loader = false;
                this.csvadded = true;
                this.importfile = false;
                console.log('not uploaded files', errors);
                this.importFileResponse.error = [...errors];
                this.importFileResponse.sucess = [...sucesses];
                this.importFileResponse.numSuccesses = numSuccesses;
                this.importFileResponse.numFailures = numFailures;
              }
            }
          );
        });
        return 'employees added';
      });
    };

    reader.readAsText(file);
  }

  //FOR CHECKING THE CHECK BOX

  onCheckboxChange($event, user: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    this.isSelectDisabled = $event.target.checked;
    if (isChecked) {
      this.countCard++;
      if (user == 'All') {
        this.selectedEmployess = [...this.employee];
        // Check all checkboxes
        this.employee.forEach((el: any, i: number) => {
          el['checked'] = true;
        });
        this.countCard = this.employee.length;
      } else {
        this.employee.forEach((el: any, i: number) => {
          if (el._id == user._id) {
            this.employee[i]['checked'] = true;
            return;
          }
        });
        this.selectedEmployess.push(user);
      }
      console.log(this.selectedEmployess, 'added employees');
    } else {
      this.countCard--;
      if (user == 'All') {
        this.selectedEmployess = [];
        // Uncheck all checkboxes
        this.employee.forEach((el: any, i: number) => {
          el['checked'] = false;
        });
        this.countCard = 0;
      } else {
        let index: number = -1;
        this.selectedEmployess.forEach((el: any, i: number) => {
          if (el._id == user._id) {
            index = i;
            return;
          }
        });
        this.employee.forEach((el: any, i: number) => {
          if (el._id == user._id) {
            this.employee[i]['checked'] = false;
            return;
          }
        });
        if (index >= 0) {
          this.selectedEmployess.splice(index, 1);
        }
      }
      console.log(this.selectedEmployess, 'removed user');
    }
    this.selectedEmployess.sort((a, b) => a.uid - b.uid);
  }

  toggleAllCheckboxes() {
    let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type === 'checkbox') {
        checkboxes[i].checked = this.isChecked;
      }
    }
  }

  validateCsvFile(file: File): boolean {
    const allowedExtensions = /(\.csv)$/i;

    if (!allowedExtensions.exec(file.name)) {
      return false;
    }

    return true;
  }

  
  generateSampleCsvFile() {
    const csvData = [
      [
        'Uid',
        'Name',
        'DateOfJoining',
        'Mobile',
        'E-mail',
        'Timing',
        'Gender',
        'Designation',
        'Location',
        'Ctc',
        'Job_Type',
        'Url',
        'City',
        'Bankname',
        'Ifsc',
      ],
      [
        '2986',
        'John kumar',
        '9/28/93',
        '8825167890',
        'john1v5@gmail.com',
        '10.00am to 6:00pm',
        'Male',
        'Full Stack Developer',
        'Mohali',
        '8LPA',
        'Internship',
        'https://cdn.finlmnoataktackcontent.com',
        'Mohali',
        'Punjab National Bank',
        'PNB7906456',
      ],
    ];

    const blob = new Blob([csvData.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    FileSaver.saveAs(blob, 'sample.csv');
  }

  //FILTER STATUS USING CUSTOM PIPE
  setStatusFilter(status: string) {
    this.statusFilter = status;

    this.fetchdata();
  }

  employeefilter() {
    this.dashService.getEmployee().subscribe((data: any[]) => {
      this.employee = data;
    });
    this.fetchdata();
  }

  ngOnChange() {}
  searchFieldDisabled(): boolean {
    return this.employee.length == 0;
  }
  SelectedCard() {
    return this.countCard;
  }
  sortEmployeeByUid(data: any) {
    data.sort((a: any, b: any) => +a.uid - +b.uid);
    console.log(data, 'adarsh sort');
    return data;
  }
  item: boolean = true;
  itemopen() {
    this.item = true;
  }
}
