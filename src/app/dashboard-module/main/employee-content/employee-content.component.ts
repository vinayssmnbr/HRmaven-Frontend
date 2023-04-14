import { Component, OnInit, Input, Output, EventEmitter,Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DashService } from '../../shared/dash.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-employee-content',
  templateUrl: './employee-content.component.html',
  styleUrls: ['./employee-content.component.css'],
})
export class EmployeeContentComponent implements OnInit {

  constructor(public dashService: DashService,private formBuilder: FormBuilder,@Inject(DOCUMENT) public document: Document) {
    dashService.activeComponent = 'employees';
    dashService.headerContent = '';

  }

  buttonbackgroundColor = '#2F2C9F';
  buttonColor = '#FFFFFF';
  buttonbackgroundColor2 = '#ECECEC';
  buttonColor2 = '#2F2C9F';
  buttonbackgroundColor3 = '#2F2C9F';
  buttonColor3 = '#FFFFFF';
  employee: any=[];
  query: string = '';
  designation: string = '';
  data: any;
  deletedata:any;
  empdesignation="";
  employeeid:any;
  show:any=false;


  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    designation: new FormControl(''),
    employee_id: new FormControl(''),
    dateOfJoining: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl('option1'),
    mobile: new FormControl(''),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    address: new FormControl(''),
    bankname: new FormControl(''),
    adhaarno: new FormControl(''),
    accountno: new FormControl(''),
    ifsc: new FormControl(''),
    panno: new FormControl(''),
  });



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
    this.deletedata=data;


  }

 //UPDATE DATA
 toUpdate():void{
  const id=this.data.id
  const updatedata=this.form.value
  this.dashService.updateEmployee1(id,updatedata).subscribe(()=>{
    console.log('dat updated successfully')
  })
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
  }

  function(){
    this.show=!this.show;
  }

  //FILTER DESIGNATION
  filter(checkbox: string) {
    this.designation = checkbox;
    this.dashService
      .searchuid(this.query, this.designation)
      .subscribe((res) => {
        console.log(res);
        this.employee = res;
        console.log('data', res);
      });
  }

  opendpdtn=false;
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
      id:3,
      name: 'HDFC Bank',
    },
    {
      id:4,
      name: 'ICICI Bank',
    }
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {

    this.contentdropdown = !this.contentdropdown;
  }
  contentdropdown1: boolean = false;
  dropdownOpen1() {

    this.contentdropdown1 = !this.contentdropdown1;
  }
  contentdropdown2:boolean=false;
  dropdownOpen2() {

    this.contentdropdown2 = !this.contentdropdown2;
  }
  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Selectvariable1: string='Select';
  colorvariable1:number=0;
  Selectvariable2: string = 'Select Bank';
  colorvariable2: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
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


