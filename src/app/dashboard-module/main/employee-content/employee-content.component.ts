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
  employee: any[] = [];
  query: string = '';
  designation: string = '';
  empdesignation: string[] = [
    'Software Developer',
    'Frontend Developer',
    'UI/UX Designer',
    'Full Stack Developer',
    'Quality Analyst',
  ];
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
  data: any;

  constructor(
    public dashService: DashService,
    private formBuilder: FormBuilder
  ) {
    dashService.activeComponent = 'employees';
    dashService.headerContent = '';
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

    this.dashService.deleteStudent(data._id).subscribe(() => {
      console.log('deleted');
      this.employee = this.employee.filter((s) => s !== data);
    });
    this.fetchdata();
  }

 //UPDATE DATA
 toUpdate():void{
  const id=this.data.id
  const updatedata=this.form.value
  this.dashService.updateEmployee(id,updatedata).subscribe(()=>{
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


  ngOnInit() {
    this.fetchdata();

    //designation custom

    const optionMenu = document.querySelector<HTMLElement>('.select-menu')!,
      selectBtn = optionMenu.querySelector<HTMLElement>('.select-btn')!,
      options = optionMenu.querySelectorAll<HTMLElement>('.option'),
      sBtn_text = optionMenu.querySelector<HTMLElement>('.sBtn-text')!;
    selectBtn.addEventListener('click', () =>
      optionMenu.classList.toggle('active')
    );
    options.forEach((option) => {
      option.addEventListener('click', () => {
        let selectedOption =
          option.querySelector<HTMLElement>('.option-text')!.innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove('active');
      });
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
    this.deletemessage = true;
    this.rowdelete = false;
    this.showModal = true;
  }
  closeModal3() {
    this.showModal = false;
  }
  nextForm2() {}

  onOptionChange() {}
}
