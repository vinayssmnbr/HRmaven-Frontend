import { Component, Input } from '@angular/core';
import { DashService } from '../../shared/dash.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { log } from 'console';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { CookieService } from 'ngx-cookie-service';

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
  Searchuid: any = '';
  // currentCandidateUid: any = '';

  constructor(
    private dashService: DashService,
    private cookie: CookieService,
    private formBuilder: FormBuilder
  ) {
    dashService.activeComponent = 'job-details';
    dashService.headerContent = '';
  }
  ngOnInit() {
    this.item = this.dashService.getSelectedJobDetail();
    console.log('select1', this.item);

    this.fetchJobVecancies();
    this.csvForm = this.formBuilder.group({
      csv: [''],
    });
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
  importfile: boolean = false;
  csvadded: boolean = false;
  loader: boolean = false;
  csvForm: FormGroup;
  importFileResponse: any = { success: [], error: [] };
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
    uid: new FormControl(this.currentCandidateUid),
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

  csvform = new FormGroup({
    csv: new FormControl('', Validators.required),
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
  // loading:boolean=false
  async tabChange1() {
    let data = {
      ...this.newcandidateform.value,
    };
    let url = await this.onUpload(this.selectedPdfFile, false);
    data['url'] = url;

    this.dashService.addCandidate(data).subscribe((result) => {
      this.dashService.addCandidate(this.newcandidateform);
      // this.newcandidateform.reset();
      // this.loading=false
      this.fetchJobVecancies();
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
  importmodal: boolean = false;
  modalimp() {
    this.importmodal = true;
  }

  closeinputmodal() {
    this.importmodal = false;
    this.csvadded = false;
    this.fetchJobVecancies();
  }

  // onFileSelectedrem(event: any): void {
  //   console.log
  //   const file: File = event.target.files[0];
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const csv: string = e.target.result;
  //     const lines: string[] = csv.split(/\r\n|\n/);
  //     const headers: string[] = lines[0].split(',');
  //     const data: any[] = [];

  //     for (let i = 1; i < lines.length - 1; i++) {
  //       const values: string[] = lines[i].split(',');
  //       const item: any = {};

  //       for (let j = 0; j < headers.length; j++) {
  //         item[headers[j]] = values[j];
  //       }

  //       data.push(item);
  //     }
  //     console.log(data, 'adarsh console')
  //     data.forEach( candidate => {
  //       console.log("adarsh",  candidate)
  //       this.dashService.addCandidate( candidate).subscribe((res: any) => {
  //         console.log(res, 'response')
  //         console.log(res.data)
  //       })
  //     });
  //     console.log(data);
  //     // this.fetchdata()
  //   };

  //   reader.readAsText(file);
  //   // this.fetchdata()

  // }
  waitThreeSeconds() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Done!');
      }, 6000);
    });
  }

  async onFileSelectedrem(event: any) {
    const file: File = event.files[0];
    console.log(file);
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
      this.dashService.getCandidateUid().subscribe((res: any) => {
        uid = res.uid;
        console.log(res, 'uid response');
        console.log(res.message);
        if (uid == -1) return 'there is an error while getting uid';

        data.forEach((candidate) => {
          console.log('Adding employee:', candidate);
          candidate['uid'] = uid++;
          this.dashService.addCandidate(candidate).subscribe(
            async (res: any) => {
              console.log('res', res);
              console.log('messagge', res.message);
              this.loader = true;
              responseArr.push(res);
              console.log('Data:', res.data);
              if (res.status == 'failed') {
                numFailures++;
                errors.push({ ...candidate, error: res.message });
              } else if (res.status == 'Success') {
                numSuccesses++;
                sucesses.push(res);
              }
              if (responseArr.length == data.length) {
                await this.waitThreeSeconds();
                this.loader = true;
                this.csvadded = true;
                this.importfile = false;
                this.importmodal = false;
                console.log('not uploaded files', errors);
                this.importFileResponse.error = [...errors];
                this.importFileResponse.sucess = [...sucesses];
                this.importFileResponse.numSuccesses = numSuccesses;
                this.importFileResponse.numFailures = numFailures;
              }
            },
            async (error: any) => {
              numFailures++;
              errors.push({ ...candidate, error });
              responseArr.push(candidate);
              if (responseArr.length == data.length) {
                await this.waitThreeSeconds();
                this.loader = true;
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
  colseimportmod: boolean = false;
  closeimportmodal() {
    this.importmodal = false;
    this.csvadded = false;
    this.colseimportmod = true;
    this.fetchJobVecancies();
  }

  searchFieldDisabled(): boolean {
    return this.candidate.length == 0;
  }
}
