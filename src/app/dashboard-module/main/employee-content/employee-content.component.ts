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
// import { saveAs } from 'file-saver';
// import { json2csv } from 'json2csv';


@Component({
  selector: 'app-employee-content',
  templateUrl: './employee-content.component.html',
  styleUrls: ['./employee-content.component.css'],
})
export class EmployeeContentComponent implements OnInit {
  // user:any;
  isChecked: boolean =true;
  // isChecked1:boolean=true;
  // parentSelector: boolean = false;
  users: any[] = [];
  selected: any[] = [];
  selectAll: boolean = false;
  parentSelector: boolean = false;
  employee: any = [];
  selectedEmployess: any[] = [];
  selectedEmployee: any;
  designationdropdownOption: boolean = false;
  name: any;
  email: any;
  fileName: string = '';
  fileName1: string = '';

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
    csv: new FormControl('', Validators.required)
  })
  get registrationFormControl() {
    return this.form.controls;
  }

  selectEmployee(user: any) {
    this.dashService.setSelectedEmployee(user);
  }
  //ADD DATA
  // file: File | null = null;
  submit() {
    if (this.form.invalid) return;
    console.log(this.form.value);
    const data = this.form.value;
    this.showModalContent = false;
    this.fourthStep = true;
    this.thirdStep = false;
    data.designation = this.designation;
    data.location = this.location;
    data.timing = this.timing;
    data.job_type = this.job_type;
    this.dashService.addEmployee(data).subscribe((result) => {
      this.dashService.addEmployee(this.form);
      this.fetchdata();
      this.form.reset();
    });
  }

  form1Valid: boolean = this.form.controls.name.valid;

  //GET DATA
  fetchdata() {
    this.dashService.getEmployee().subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
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

  firstStep: boolean = true;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  fourthStep: boolean = false;
  showModalContent: boolean = true;
  fifthstep: boolean = false;
  onNextForm() {
    this.firstStep = false;
    this.secondStep = true;
    this.onUpload(this.selectedFile);
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
  nextForm2() { }
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
      id: 0,
      name: '9.00am to 6:00pm',
    },
    {
      id: 0,
      name: '10.00am to 5:00pm',
    },
    {
      id: 0,
      name: '10.00am to 6:00pm',
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
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
    if (this.selectedFile.type.split('/')[0] !== 'image') {
      console.error('Invalid file type. Please select an image.');
      return;
    }
    // this.onUpload(  this.selectedFile );
  }
  // files: File[] = [];

  // onDrop(event: DragEvent) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const files = event.dataTransfer.files;
  //   for (let i = 0; i < files.length; i++) {
  //     this.files.push(files.item(i));
  //   }
  // }

  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }
  onFileSelected1(event: any) {
    this.selectedFile1 = event.target.files[0];
    this.fileName1 = this.selectedFile1 ? this.selectedFile1.name : '';
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
    this.fetchdata()
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
      // if (res.length > 0) {
      //   this.emptybox = false;
      // }
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

  // onSelectChange() {
  //   // Define your color logic here based on the selectedOption value
  //   switch (this.selectedOption) {
  //     case 'option1':
  //       document.querySelector('select').style.backgroundColor = 'red';
  //       break;
  //     case 'option2':
  //       document.querySelector('select').style.backgroundColor = 'green';
  //       break;
  //     case 'option3':
  //       document.querySelector('select').style.backgroundColor = 'blue';
  //       break;
  //     default:
  //       document.querySelector('select').style.backgroundColor = 'white';
  //       break;
  //   }
  // }
  // colorgreen() {
  //   this.iscolorgreen = !this.iscolorgreen;
  // }
  // coloryellow() {
  //   this.iscoloryellow = !this.iscoloryellow;
  // }
  // colorbrown() {
  //   this.iscolorbrown = !this.iscolorbrown;
  // }
  selectedUser: any;
  backgroundColor: string;
  color: string;
  borderColor: string;
  onSelectChange(event: any, user: any) {
    // if(user===this.selectedUser){
    switch (event.target.value) {
      case 'active': {
        this.backgroundColor = 'rgba(123, 211, 109, 0.3)';
        this.color = '#3D9030';
        this.borderColor = 'rgba(123, 211, 109, 0.3)';
        break;
      }
      case 'terminated': {
        this.backgroundColor = 'rgba(250, 151, 150, 0.2)';
        this.color = '#CB1E0F';
        this.borderColor = 'rgba(250, 151, 150, 0.2)';
        break;
      }
      case 'resigned': {
        this.backgroundColor = 'rgba(255, 238, 82, 0.5)';
        this.color = '#CE524A';
        this.borderColor = 'rgba(255, 238, 82, 0.5)';
        break;
      }
      case 'absconder': {
        this.backgroundColor = 'rgba(248, 187, 111, 0.4)';
        this.color = '#DB771D';
        this.borderColor = 'rgba(248, 187, 111, 0.4)';
        break;
      }
      default: {
        this.backgroundColor = '';
        this.color = '';
        this.borderColor = '';
        break;
      }

        console.log(event.target.value)
    }
    this.dashService.updateEmpStatus(user._id, event.target.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  selectUser(user) {
    this.selectedUser = user;
    this.backgroundColor = '';
    this.color = '';
    this.borderColor = '';
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


  download(): void {
    this.dashService.exportUsers(this.selectedEmployess).subscribe(
      (data: Blob) => {
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'users.csv';
        link.click();
      },
      error => console.log(error)
    );
  }


  onFileSelectedrem(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

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
      console.log(data, 'adarsh console')
      data.forEach(employee => {
        console.log("Adarsh", employee)
        this.dashService.addEmployee(employee).subscribe((res: any) => {
          console.log(res, 'response')
          console.log(res.data)
        })
      });
      console.log(data);
      // this.fetchdata()
    };

    reader.readAsText(file);
    // this.fetchdata()

  }


  importFile() {
    const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
    fileInput.click();
  }


  

  
  onCheckboxChange($event, user: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
  
    if (isChecked) {
      if (user == 'All') {
        this.selectedEmployess = [...this.employee];
        // Check all checkboxes
        this.employee.forEach((el:any, i: number) => {
          el['checked'] = true;
        });
      } else {
        
        this.employee.forEach((el: any, i: number) => {
          if (el._id == user._id) {
            this.employee['checked'] = true;
            return;
          }
        })
        this.selectedEmployess.push(user);
      }
      console.log(this.selectedEmployess, 'added employees');
  
    } else {
      if (user == 'All') {
        this.selectedEmployess = [];
        // Uncheck all checkboxes
        this.employee.forEach((el:any , i:number) => {
          el['checked'] = false;
        });
      } else {
        let index: number = -1;
        this.selectedEmployess.forEach((el: any, i: number) => {
          if (el._id == user._id) {
            index = i;
            return;
          }
        })
        this.employee.forEach((el: any, i: number) => {
          if (el._id == user._id) {
            this.employee['checked'] = false;
            return;
          }
        })
        if (index >= 0) {
          this.selectedEmployess.splice(index, 1);
        }
      }
      console.log(this.selectedEmployess, 'removed user')
  
    }
  }



  toggleAllCheckboxes() {
    let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type === 'checkbox') {
        checkboxes[i].checked = this.isChecked;
      }
    }
  }





}