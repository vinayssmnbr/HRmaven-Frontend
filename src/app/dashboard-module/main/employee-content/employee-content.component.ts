import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-employee-content',
  templateUrl: './employee-content.component.html',
  styleUrls: ['./employee-content.component.css'],
})
export class EmployeeContentComponent implements OnInit {
  buttonbackgroundColor = '#2F2C9F';
  buttonColor = '#FFFFFF';
  buttonbackgroundColor2 = '#ECECEC';
  buttonColor2 = '#2F2C9F';
  buttonbackgroundColor3 = '#2F2C9F';
  buttonColor3 = '#FFFFFF';
  // employeeForm: FormGroup;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    designation: new FormControl(''),
    uid: new FormControl(''),
    dateOfJoining: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl('option1'),
    mobile: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    bankname: new FormControl(''),
    adhaarno: new FormControl(''),
    accountno: new FormControl(''),
    ifsc: new FormControl(''),
    panno: new FormControl(''),
  });
  employee: any[] = [];

  constructor(
    public dashService: DashService,
    private formBuilder: FormBuilder
  ) {
    dashService.activeComponent = 'employees';
    dashService.headerContent = '';
  }


  submit(data: any) {
    console.log(this.form.value);
    this.showModalContent = false;
    this.fourthStep = true;
    this.thirdStep = false;
    this.dashService.addEmployee(data).subscribe((result) => {
      this.dashService.addEmployee(this.form);
      console.log(result);
      this.fetchdata()
    });
  }
fetchdata(){
  this.dashService.getEmployee().subscribe((res: any) => {
    console.log('data', res);
    this.employee = res.response;

  });
}

  Removedata(data: any) {
    if (confirm('Are you sure you want to delete this Employee?')) {
      this.dashService.deleteStudent(data._id).subscribe(() => {
        console.log('deleted')
        this.employee = this.employee.filter((s) => s !== data);
        this.fetchdata()
      });
    }
  }


  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   name: [''],
    //   designation: [''],
    //   uid: [''],
    //   dateOfJoining: [''],
    //   dateOfBirth: [''],
    //   gender: [''],
    //   mobile: [''],
    //   email: [''],
    //   address: [''],
    //   bankname: [''],
    //   accountno: [''],
    //   adhaarno: [''],
    //   panno: [''],
    //   ifsc: ['']
    // });
    // this.dashService.getEmployee().subscribe((res:any)=>{
    //   console.log("data",res)
    //     this.employee=res.response
    // })
    this.fetchdata()

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
  }
  nextForm2() {}
}
