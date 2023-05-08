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
  ngOnInit() { }
  inputfilename: boolean = false;
  fileName: string = '';
  onfileselected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
  }
  leaves: any = [];
  str = '';
  obj: any;
  Selectvariable3: any = '';
  constructor(public empService: EmpService, private formBuilder: FormBuilder) {
    empService.activeComponent = 'leave';
    empService.headerContent = '';
    this.leavegraphcontent();
    this.obj = {
      casual: 1,
      compensatory: 2,
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
  }s

  date = new Date();

    async Submit() {
      console.log(this.empleaveForm.value);

     this.onUpload();

  }


  cancel() {
    this.empleaveForm.reset();
    this.Selectvariable = 'casual';
    this.empleaveForm.value.category = this.Selectvariable;
    this.str = '0';
    this.empleaveForm.value.duration = this.str;
    this.Selectvariable1 = 'select'
    this.selectedFile1=null;

  }

  onfileselect(event: any) { }
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
    category: new FormControl(''),
    duration: new FormControl(''),
    url: new FormControl(''),
    reason: new FormControl(''),
    shortime: new FormControl('')
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
      name: 'half 1',
    },
    {
      id: 2,
      name: 'half 2',
    },
    {
      id: 3,
      name: 'compensatory',
    },
    {
      id: 4,
      name: 'short',
    },
    {
      id: 5,
      name: 'medical',
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
    if (arr.id == 4) {
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
  Selectvariable1: string = 'select';
  colorvariable1: number = 0;
  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.colorvariable1 = arr1.id;
    this.contentdropdown1 = false;
    console.log(arr1.name);
    this.empleaveForm.value.shortime = arr1.name;
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
    this.selectedFile = event.target.files[0];
    var filename = event.target.files[0].name;
    filename = filename.toLowerCase();
    console.log(filename);
    var ext = filename.substring(filename.lastIndexOf('.') + 1);

    if (ext == "jpg" || ext == "gif" || ext == 'jpeg' || ext == 'png' || ext == 'pdf') {
      // alert('acceptable file extension');
      return;
    } else {
      alert("file is not acceptable");
      return;
    }
  }
  fileurl: any;
   onUpload(){
    console.log(this.selectedFile);
    if(this.selectedFile!=null){
      this.loader=true;
      this.empService.upload(this.selectedFile).then(() => {
      console.log('File uploaded successfully.', this.empService.fileUrl);
      this.empService.fileUrl;
      this.fileurl = this.empService.fileUrl;
      this.empleaveForm.value.url = this.empService.fileUrl;
      this.leave_approved_form = true;
      this.uploadform();
      this.cancel();
      console.log(this.leaves);

    });
  }
    else{
      this.uploadform();
      this.leave_approved_form=true;
      this.cancel();
    }
  }
  uploadform(){
    this.empleaveForm.value.category = this.Selectvariable;
    this.empleaveForm.value.duration = this.str;
    this.empleaveForm.value.url = this.fileurl;
    this.empleaveForm.value.shortime = this.Selectvariable1;
    if (this.Selectvariable == 'short') {
      this.empleaveForm.value.category = this.Selectvariable;
      this.empleaveForm.value.duration = this.Selectvariable1;
    }
    console.log(this.empleaveForm.value);
    this.empService.createleave(this.empleaveForm.value).subscribe((res) => {
      console.log(res)
      this.loader=false;
      this.leaves.push(res);
      this.leavegraphcontent();
    });
  }

}
