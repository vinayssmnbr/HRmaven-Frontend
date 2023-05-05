import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import * as moment from 'moment';

import { EmpService } from '../../shared/emp.service';
@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css'],
})
export class LeavesContentComponent {
  // empleaveForm: FormGroup;
  // ----------Input file custom girija----------------------
  progressBar: any;
  progressText: any;
  progress: number = 0;
  interval: any;
  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progress_upload');
    this.progressText = document.getElementsByClassName('progress-text-input');

    this.interval = setInterval(() => {
      this.progress++;
      if (this.progress > 100) {
        this.progress = 0;
      }
      this.progressBar[0].style.width = `${this.progress}%`;
      this.progressText[0].innerText = `${this.progress}%`;
    }, 50);
  }
  inputfilename: boolean = false;
  fileName: string = '';
  onfileselected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
  }

  // ----------------------------------------------------
  leaves: any = [];
  str = '';
  obj = {
    casual: 1,
    earned: 2,
    urgent: 3,
    medical: 4,
  };

  constructor(public empService: EmpService, private formBuilder: FormBuilder) {
    empService.activeComponent = 'leave';
    empService.headerContent = '';
    this.leavegraphcontent();
    this.obj = {
      casual: 1,
      earned: 2,
      urgent: 3,
      medical: 4,
    };
  }

  async leavegraphcontent() {
    await this.empService.leavegraph().subscribe((res: any) => {
      console.log(res.response[0]);
      this.obj = res.response[0];
      console.log(this.obj);
    });

    this.empService.leavehistory().subscribe((res: any) => {
      console.log(res.response[0]);
      if (res.response[0].History == undefined) {
        console.log('undefined');
      } else {
        console.log(res.response[0].History);
        this.leaves = res.response[0].History;
      }
    });
  }

  date = new Date();

  Submit() {
    this.empleaveForm.value.category = this.Selectvariable;
    this.empleaveForm.value.duration = this.str;
    this.empleaveForm.value.url = this.fileurl;
    console.log(this.empleaveForm.value);
    this.empService.createleave(this.empleaveForm.value).subscribe((res) => {
      console.log(res);
    });
    this.leaves.push({
      appliedOn: this.date.toISOString(),
      category: this.empleaveForm.value.category,
      from: this.empleaveForm.value.from,
      to: this.empleaveForm.value.to,
      reason: this.empleaveForm.value.reason,
      status: 'pending',
      duration: Number(this.str),
      message: '',
    });
    console.log(this.leaves);
  }
  cancel() {
    this.empleaveForm.reset();
    this.Selectvariable = 'Category';
    this.empleaveForm.value.category = this.Selectvariable;
    this.str = '0';
    this.empleaveForm.value.duration = this.str;
  }

  onfileselect(event: any) {}
  selectedFile1: File | null = null;
  onFileSelected1(event: any) {
    this.selectedFile1 = event.target.files[0];
    // this.fileName1 = this.selectedFile1 ? this.selectedFile1.name : '';
  }
  // onUpload(file:any) {
  //   console.log('fdjkhf');
  //   this.empService.upload1(file).then((res) => {
  //     console.log(res)
  //   });
  // }

  empleaveForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    duration: new FormControl('', Validators.required),
    url: new FormControl(''),
    reason: new FormControl(''),
  });

  getDates() {
    const dateArray: string[] = [];
    let startDate = this.empleaveForm.value.from;
    let stopDate = this.empleaveForm.value.to;
    let currentDate = moment(startDate);
    const endDate = moment(stopDate);
    while (currentDate <= endDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    let len = dateArray.length;
    this.str = len.toString();
    let obj = { duration: this.str };
    console.log(this.str);
    this.empleaveForm.value.duration = this.str;
  }

  array: any = [
    {
      id: 0,
      name: 'casual',
    },
    {
      id: 1,
      name: ' Half day leave',
    },
    {
      id: 2,
      name: 'Compensatory leave',
    },
    {
      id: 3,
      name: 'Short leave',
    },
    {
      id: 4,
      name: 'Medical leave',
    },
  ];
  halfdayleave: boolean = false;
  shortleave: boolean = false;
  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Select';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    if (arr.id == 3) {
      this.shortleave = true;
    } else {
      this.shortleave = false;
      this.halfdayleave = false;
    }
    if (arr.id == 1) {
      this.halfdayleave = true;
    }

    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
    this.empleaveForm.value.category = arr.name;
  }

  array1: any = [
    {
      id: 0,
      name: '9 am - 11 am',
    },
    {
      id: 1,
      name: '10 am - 12 am',
    },
    {
      id: 2,
      name: '11 am - 1 am',
    },
    {
      id: 3,
      name: '12 am - 2 am',
    },
    {
      id: 4,
      name: '1 am - 3 am',
    },
    {
      id: 5,
      name: '2 am - 4 am',
    },
    {
      id: 6,
      name: '3 am - 5 am',
    },
  ];
  contentdropdown1: boolean = false;
  dropdownOpen1() {
    this.contentdropdown1 = !this.contentdropdown1;
  }
  Selectvariable1: string = '9 am - 11 am';
  colorvariable1: number = 0;
  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.colorvariable1 = arr1.id;
    this.contentdropdown1 = false;
    console.log(arr1.name);
    this.empleaveForm.value.category = arr1.name;
  }

  leaveshistory = false;
  employeemaintable = true;
  tablehistory() {
    this.leaveshistory = true;
    this.employeemaintable = false;
  }
  employee_leaves() {
    this.leaveshistory = false;
    this.employeemaintable = true;
  }

  // ---------Modal popoup----------
  leave_approved_form = false;
  applyleaves() {
    this.leave_approved_form = true;
    this.Submit();
  }
  closemodal() {
    this.leave_approved_form = false;
  }
  designationdropdownOption: boolean = false;

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }

  loader = false;
  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    this.loader = true;
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }
  fileurl: any;
  onUpload(): void {
    this.empService.upload(this.selectedFile).then(() => {
      console.log('File uploaded successfully.', this.empService.fileUrl);
      this.empService.fileUrl;
      this.fileurl = this.empService.fileUrl;
      this.loader = false;
      this.empleaveForm.value.url = this.empService.fileUrl;
    });
  }
}
