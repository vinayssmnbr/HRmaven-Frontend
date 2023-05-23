import { Component, Input } from '@angular/core';
import { DashService } from '../../shared/dash.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { log } from 'console';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent {
  @Input() item: any;
  fileName: string = '';
  jobrecord: any[] = [];
  statusFilter: string = 'All';

  constructor(private dashService: DashService) {
    dashService.activeComponent = 'job-details';
    dashService.headerContent = '';
  }
  ngOnInit() {
    this.item = this.dashService.getSelectedJobDetail();
    console.log('select1', this.item);

    this.fetchJobVecancies();
  }

  statusItem: string[] = [
    'All',
    'Resume Received',
    'Shortlisted',
    'Interview',
    'Hired',
    'Rejected',
    'Archive',
  ];

  id: any = 'all';
  candidate: any[] = [];
  selectedCandidate: any[] = [];
  selectedPdfFile: any = '';
  currentCandidateUid: any = '';
  tabChange(status: string) {
    // this.id = ids;
    // console.log(this.id);
    this.statusFilter = status;
  }
  designationdropdownOption: boolean = false;

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }
  array: any = [
    {
      id: 0,
      name: 'Shortlisted',
    },
    {
      id: 1,
      name: 'Hired',
    },
    {
      id: 2,
      name: 'Interview',
    },
    {
      id: 3,
      name: 'Rejected',
    },
    {
      id: 4,
      name: 'Archive',
    },
  ];
  array1: any = [
    {
      id: 0,
      name: 'Resume Received',
    },
    {
      id: 1,
      name: 'Archive',
    },
    {
      id: 2,
      name: 'Hired',
    },
    {
      id: 3,
      name: 'Shortlisted',
    },
    {
      id: 4,
      name: 'Rejected',
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
  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.colorvariable = arr.id;
    console.log(arr.name);
  }

  Selectvariable1: string = 'Designation';
  colorvariable1: number = 0;
  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.contentdropdown1 = false;
    this.colorvariable1 = arr1.id;
    console.log(arr1.name);
  }
  Jobdetails: boolean = false;
  viewbtn() {
    this.Jobdetails = true;
  }
  close_modal() {
    this.Jobdetails = false;
  }
  addcandidate: boolean = false;
  closemodal() {
    this.addcandidate = false;
  }
  openmodal() {
    this.addcandidate = true;
  }
  Newcandidate: boolean = false;

  openaddmodal() {
    this.Newcandidate = true;
    this.addcandidate = false;
  }

  closedone(data: any) {
    this.Newcandidate = false;

    // this.dashService.getCandidate(data).subscribe((result) => {
    //   this.dashService.addCandidate(this.newcandidateform);
    //   this.fetchJobVecancies();

    // });
  }

  candidateNameValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const valid = nameRegex.test(control.value);
    return valid ? null : { invalidName: true };
  }

  newcandidateform = new FormGroup({
    candidateName: new FormControl('', [
      Validators.required,
      this.candidateNameValidator,
      Validators.pattern('[a-zA-Z ]+'),
    ]),
    contactnumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[6-9]{1}[0-9]{9}'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{1,63}$'),
    ]),
    applieddate: new FormControl('', Validators.required),

    url: new FormControl('', Validators.required),
    // url: new FormControl(''),
  });

  get registrationFormControl() {
    return this.newcandidateform.controls;
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

  mobileExists = false;
  mobileNo: any;
  checkmobileExists() {
    this.mobileNo = this.newcandidateform.controls['mobile'].value;

    console.log('adarsh', this.mobileNo);
    this.dashService
      .getCandidateMobile(this.mobileNo)
      .subscribe((response: any) => {
        console.log('prince', response);
        if (response.flag) {
          this.mobileExists = true;
          console.log(response.message);
        } else {
          this.mobileExists = false;
          console.log(response.message);
        }
      });
  }

  emailExists = false;
  emailId: any;

  checkEmailExists() {
    this.emailId = this.newcandidateform.controls['email'].value;

    console.log('adarsh', this.emailId);
    this.dashService
      .getCandidateEmail(this.emailId)
      .subscribe((response: any) => {
        console.log('prince', response);
        if (response.flag) {
          this.emailExists = true;
          console.log(response.message);
        } else {
          this.emailExists = false;
          console.log(response.message);
        }
      });
  }

  newcandidatedetail(data: any) {
    // console.log(this.newcandidateform.value)
    // this.dashService.addCandidate(data).subscribe((result) => {
    //   this.dashService.addCandidate(this.newcandidateform);
    //   // this.newcandidateform.reset();
    // });
  }
  progress: boolean = false;
  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
    this.progress = true;
    this.onUpload(this.selectedFile);
  }

  onUpload(file) {
    console.log('adarsh');
    this.dashService.uploaded(file).then(
      (res) => {
        this.progress = false;
        this.newcandidateform.patchValue({
          url: res && res.url,
        });
      },
      (err) => {
        console.log(err);
        this.progress = false;
      }
    );
  }

  // loading:boolean=false
  tabChange1() {
    // this.loading=true
    // let data = this.newcandidateform.value;

    let data = { ...this.newcandidateform.value };
    this.dashService.addCandidate(data).subscribe((result) => {
      this.dashService.addCandidate(this.newcandidateform);
      // this.newcandidateform.reset();
      // this.loading=false
    });
    this.newcandidateform.reset();
  }

  fetchJobVecancies() {
    this.dashService.getCandidate().subscribe((data: any) => {
      console.log('hbhvdhsdh', data);
      this.candidate = data;
    });
  }
  selecteditem: any;

  onSelectChange(event: any, item: any) {
    if (item) {
      item.status = event.target.value;
      this.selecteditem = item._id;
      this.dashService.updateJobStatus(item._id, event.target.value).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  download(): void {
    const selectedCandidate = this.candidate.filter((emp) => emp.checked);
    if (selectedCandidate.length === 0) {
      alert('Please select at least one employee to download.');
      return;
    }

    const data = [
      [
        'CANDIDATEID',
        'CANDIDATENAME',
        'APPLIEDDATE',
        'EMAIL',
        'STATUS',
        'CONTACTNUMBER',
      ],
      ...selectedCandidate.map((candidate) => [
        candidate.uid,
        candidate.candidateName,
        candidate.applieddate,
        candidate.email,
        candidate.status,
        candidate.contactnumber,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const filename = 'data.xlsx';
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, filename);
  }

  onCheckboxChange($event, user: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    if (isChecked) {
      if (user == 'All') {
        this.selectedCandidate = [...this.candidate];
        // Check all checkboxes
        this.candidate.forEach((el: any, i: number) => {
          el['checked'] = true;
        });
      } else {
        this.candidate.forEach((el: any, i: number) => {
          if (el._id == user._id) {
            this.candidate[i]['checked'] = true;
            return;
          }
        });
        this.selectedCandidate.push(user);
      }
      console.log(this.selectedCandidate, 'added employees');
    } else {
      if (user == 'All') {
        this.selectedCandidate = [];
        // Uncheck all checkboxes
        this.candidate.forEach((el: any, i: number) => {
          el['checked'] = false;
        });
      } else {
        let index: number = -1;
        this.selectedCandidate.forEach((el: any, i: number) => {
          if (el._id == user._id) {
            index = i;
            return;
          }
        });
        this.candidate.forEach((el: any, i: number) => {
          if (el._id == user._id) {
            this.candidate[i]['checked'] = false;
            return;
          }
        });
        if (index >= 0) {
          this.selectedCandidate.splice(index, 1);
        }
      }
      console.log(this.selectedCandidate, 'removed user');
    }
    this.selectedCandidate.sort((a, b) => a.uid - b.uid);
  }
}
