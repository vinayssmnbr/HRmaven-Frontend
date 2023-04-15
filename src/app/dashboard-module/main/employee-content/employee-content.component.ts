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
   AbstractControl
} from '@angular/forms';
import { DashService } from '../../shared/dash.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-employee-content',
  templateUrl: './employee-content.component.html',
  styleUrls: ['./employee-content.component.css'],
})
export class EmployeeContentComponent implements OnInit {
  constructor(
    public dashService: DashService,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) public document: Document
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
  employee: any = [];
  employeeuid: any = [];
  currentEmployeeUid: any = '';
  query: string = '';
  designation: string = '';
  data: any;
  deletedata: any;
  empdesignation = '';
  employeeid: any;
  show: any = false;
  noRecordsFound:boolean;

 nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const nameRegex = /^[a-zA-Z\s]*$/;
  const valid = nameRegex.test(control.value);
  return valid ? null : { 'invalidName': true };
}
  form = new FormGroup({
    name: new FormControl('', [Validators.required,this.nameValidator]),
    designation: new FormControl(''),
    employee_id: new FormControl(''),
    dateOfJoining: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('option1'),
    mobile: new FormControl('',
             [Validators.required,
              Validators.maxLength(10),
            ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    bankname: new FormControl(''),
    adhaarno: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}$/),
           ]),
    accountno: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    ifsc: new FormControl('',[ Validators.required, Validators.pattern(/^([A-Z]){4}([0-9]){8}$/)]),
    panno: new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]),
          });

          get registrationFormControl(){
            return this.form.controls;
          }

          //ADD DATA
          submit(data: any) {
            console.log(this.form.value);
            this.showModalContent = false;
            this.fourthStep = true;
            this.thirdStep = false;
            this.dashService.addEmployee(data).subscribe((result) => {
              this.dashService.addEmployee(this.form);
              console.log(result);
              this.fetchdata();
            });
          }

// form1Valid: boolean = this.form.controls.name.valid && this.form.controls.designation.valid && this.form.controls.employee_id.valid && this.form.controls.gender.valid && this.form.controls.dateOfBirth.valid && this.form.controls.dateOfJoining.valid
  form1Valid: boolean = this.form.controls.name.valid

  //GET DATA
  fetchdata() {
    this.dashService.getEmployee().subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
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
  selectedUser: any = {};
  toupdate(user: any) {
    this.selectedUser = { _id: user._id };
    this.form.patchValue(user);
    console.log(this.selectedUser);
  }

  //SEARCH UID
  search() {
    console.log(this.query, 'search fn', this.designation);
    this.dashService
      .searchuid(this.query, this.designation)
      .subscribe((res) => {
        console.log(res);
        this.employee = res;
        console.log('data', res);
      });
      this.noRecordsFound=this.employee.length===0
  }

  function() {
    this.show = !this.show;
  }

  opendpdtn = false;
  ngOnInit() {
    this.fetchdata();
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
  changeColor3() {
    this.buttonbackgroundColor3 =
      this.buttonbackgroundColor3 === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
    this.buttonColor3 = this.buttonColor3 === '#FFFFFF' ? '#2F2C9F' : '#FFFFFF';
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  firstStep: boolean = true;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  fourthStep: boolean = false;
  showModalContent: boolean = true;
  fifthstep: boolean = false;
  onNextForm() {
    this.firstStep = false;
    this.secondStep = true;
  }

  onPreviousForm() {
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
    this.fetchdata();
    this.ngOnInit();
  }
  closeModal3() {
    this.showModal = false;
  }
  nextForm2() {}
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
      id:5,
      name:'Quality Analyst',
    },
    {
      id:6,
      name:'All',
    }
  ];
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
  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Selectvariable1: string = 'Select';
  colorvariable1: number = 0;
  Selectvariable2: string = 'Select Bank';
  colorvariable2: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
    this.designation = arr.name;
    console.log('str', this.designation);
    this.dashService
      .searchuid(
        this.query,
        this.designation == 'Designation' ? '' : this.designation
      )
      .subscribe((res) => {
        console.log(res);
        this.employee = res;
        console.log('data', res);
      });
      this.noRecordsFound=this.employee.length===0
  }
  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.colorvariable1 = arr1.id;
    this.contentdropdown1 = false;
    console.log(arr1.name);
  }
  Changeselect2(arr2: any) {
    this.Selectvariable2 = arr2.name;
    this.colorvariable2 = arr2.id;
    this.contentdropdown2 = false;
    console.log(arr2.name);
  }
  // for(let i=0; i)
}
