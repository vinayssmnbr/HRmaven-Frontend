import { Component, Input } from '@angular/core';
import { DashService } from 'src/app/dashboard-module/shared/dash.service';
import { EmpService } from '../../shared/emp.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent {
  @Input() i: any;

  constructor(private dashService: EmpService) {
    dashService.activeComponent = 'job-details';
    dashService.headerContent = '';
    // private empService:DashService

    this.fetchJobVecancies();
  }

  ngOnInit() {
    this.i = this.dashService.getSelectedJobDetail();
    console.log('select1', this.i);
    this.fetchcandidate();
  }
  selectedPdfFile: any = '';
  fileName: string = '';
  candidate: any = [];
  currentCandidateUid: any = '';
  id: any = 'all';
  statusFilter: string = 'All';
  Searchuid: any = '';
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
  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }

  newcandidateform = new FormGroup({
    uid: new FormControl(),
    candidateName: new FormControl('', [
      Validators.pattern('[a-zA-Z ]+'),
      Validators.required,
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

  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.colorvariable = arr.id;
    console.log(arr.name);
  }

  Jobdetails = false;
  moreview() {
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
    this.dashService.getCandidateUid().subscribe((res: any) => {
      console.log('data', res);
      this.currentCandidateUid = res.uid;
    });
  }
  Newcandidate: boolean = false;
  openaddmodal() {
    this.Newcandidate = true;
    this.addcandidate = false;
  }
  closedone() {
    this.Newcandidate = false;
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

  tabChange(status: string) {
    this.statusFilter = status;
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
    this.mobileNo = this.newcandidateform.controls['contactnumber'].value;

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

  progress: boolean = false;
  public selectedFile: File | null = null;
  fileurl: any;

  async onFileSelected(event: any) {
    console.log(event.target.value);

    this.selectedFile = await event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
    this.progress = true;
    console.log('test11');
    this.onUpload(this.selectedFile);
  }

  async onUpload(file, changeFile = true) {
    console.log('adarsh', file);
    this.selectedPdfFile = file;
    if (changeFile) {
      return 'file selected';
    }
    try {
      let response = await this.dashService.uploaded(file);
      this.progress = false;
      return response.url;
    } catch (err) {
      console.log(err);
      this.progress = false;
    }
  }

  async tabChange1() {
    console.log(this.newcandidateform.value);
    let data = {
      ...this.newcandidateform.value,
    };
    let url = await this.onUpload(this.selectedPdfFile, false);
    data['url'] = url;

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

  fetchcandidate() {
    this.dashService.fetchcandidate().subscribe((res: any) => {
      console.log(res.data);
      this.candidate = res.data;
    });
  }

  searchFieldDisabled(): boolean {
    return this.candidate.length == 0;
  }
}
