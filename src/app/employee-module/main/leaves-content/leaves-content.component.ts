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
  leaves: any = [];
  str = '';
  obj: any;
  Selectvariable3: any = '';
  date = new Date();
  onfileselect(event: any) { }
  selectedFile1: File | null = null;
  halfdayleave: boolean = false;
  shortleave: boolean = false;
  Selectvariable: string = 'Select';
  colorvariable: number = 0;
  contentdropdown: boolean = false;
  contentdropdown1: boolean = false;
  Selectvariable1: string = 'select';
  colorvariable1: number = 0;
  leaveshistory = false;
  employeemaintable = true;
  leave_approved_form = false;
  designationdropdownOption: boolean = false;
  loader = false;
  selectedFile: File | null = null;
  fileurl: any;
  loaderz:boolean=true;
  loadersuccess:boolean=false;

  onfileselected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : null;
  }

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
      this.loaderz=false;
    });
  }s


    async Submit() {
      console.log(this.empleaveForm.value);
      this.loadersuccess=true;
     this.onUpload();

  }


  cancel() {
    this.empleaveForm.reset();
    this.Selectvariable = 'Select';
    this.empleaveForm.value.category = this.Selectvariable;
    this.str = '0';
    this.empleaveForm.value.duration = this.str;
    this.Selectvariable1 = 'Select',
    this.typevariable="Select";
    this.shorttime="Select",
    this.halftime="Select"
    this.selectedFile=null;


  }


  onFileSelected1(event: any) {
    this.selectedFile1 = event.target.files[0];
    // this.fileName1 = this.selectedFile1 ? this.selectedFile1.name : '';
  }


  empleaveForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    duration: new FormControl(''),
    url: new FormControl(''),
    reason: new FormControl(''),
    type:new FormControl(''),
  });

  len:number=0;
  getDates() {
    this.typedtn=false;
    this.shorttimedtn = false;
    this.halftimedtn=false;
    const dateArray: string[] = [];
    let startDate = this.empleaveForm.value.from;
    let stopDate = this.empleaveForm.value.to;
    let currentDate = moment(startDate);
    const endDate = moment(stopDate);
    while (currentDate <= endDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    this.len = dateArray.length;
    this.str = this.len.toString();
    let obj = { duration: this.str };
    console.log(this.str);
    this.empleaveForm.value.duration = this.str;
  }



  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }

  Changeselect(arr: any) {
    this.typedtn=false;
    this.shorttimedtn = false;
    this.halftimedtn=false;
    if (arr.id == 0 && this.len<=1) {
      this.typedtn=true;
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
  array: any = [
    {
      id: 0,
      name: 'Casual',
    },
    {
      id: 1,
      name: 'Compensatory',
    },
    {
      id: 2,
      name: 'Medical',
    },
  ];


  dropdownOpen1() {
    this.contentdropdown1 = !this.contentdropdown1;
  }
  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.colorvariable1 = arr1.id;
    this.contentdropdown1 = false;
    console.log(arr1.name);
    // this.empleaveForm.value.shortime = arr1.name;
  }
  tablehistory() {
    this.leaveshistory = true;
    this.employeemaintable = false;
  }
  employee_leaves() {
    this.leaveshistory = false;
    this.employeemaintable = true;
  }
  applyleaves() {
    this.Submit();
  }
  closemodal() {
    this.leave_approved_form = false;
  }
  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }
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
   onUpload(){
    console.log(this.selectedFile);
    if(this.selectedFile!=null){
      this.loader=true;
      this.empService.upload(this.selectedFile).then(() => {
      console.log('File uploaded successfully.', this.empService.fileUrl);
      this.empService.fileUrl;
      this.fileurl = this.empService.fileUrl;
      this.empleaveForm.value.url = this.empService.fileUrl;
      this.uploadform();
      this.cancel();
      console.log(this.leaves);

    });
  }
    else{
      this.uploadform();
      this.cancel();
    }
  }
  uploadform(){
    this.loaderz=true;
    this.empleaveForm.value.category = this.Selectvariable;
    this.empleaveForm.value.duration = this.str;
    this.empleaveForm.value.url = this.fileurl;
    // this.empleaveForm.value.shortime = this.Selectvariable1;
    if (this.Selectvariable == 'Casual' && this.typevariable=='Short') {
      this.empleaveForm.value.category = 'Casual Leave';
      this.empleaveForm.value.type="Short Leave"
      this.empleaveForm.value.duration = this.shorttime;
    }
    else if(this.Selectvariable == 'Casual' && this.typevariable=='Half Day') {
      this.empleaveForm.value.category = 'Casual Leave';
      this.empleaveForm.value.type="Half Day Leave"
      this.empleaveForm.value.duration = this.halftime;
    }
    else if(this.Selectvariable == 'Medical' ||  this.Selectvariable=='Compensatory' || this.typevariable=='Full Day' )
    {
      this.empleaveForm.value.category = this.Selectvariable+' Leave';
      this.empleaveForm.value.type="Full Day Leave"
      this.empleaveForm.value.duration = this.str;
    }
    else if(this.Selectvariable=='Casual' && this.len>1){
      this.empleaveForm.value.category = 'Casual Leave';
      this.empleaveForm.value.type="Full Day Leave"
      this.empleaveForm.value.duration = this.str;

    }
    console.log(this.empleaveForm.value);
    this.empService.createleave(this.empleaveForm.value).subscribe((res) => {
      console.log(res)
      this.loader=false;
      this.leaves.push(res);
      this.leavegraphcontent();
      this.loadersuccess=false;
      this.leave_approved_form=true;
      this.cancel();
      this.loaderz=false;
    });
  }

  // /// drop down code by harpreet Singh
  arr3:any=[
    {
      id: 0,
      name: 'Short',
    },
    {
      id: 1,
      name: 'Half Day',
    },
    {
      id: 2,
      name: 'Full Day',
    },
  ];
  typedtn:boolean=false;
  typedropdown:boolean=false;
  typevariable:any='Select';
  dropdownOpentype(){
    this.typedropdown=!this.typedropdown;
  }


  Changeselecttype(arr:any)
  {
      if(arr.id=='0')
      {
        this.halftimedtn=false;
        this.shorttimedtn=true;
      }
      else if(arr.id==1)
      {
        this.halftimedtn=true;
          this.shorttimedtn=false;
      }
      else{
          this.halftimedtn=false;
          this.shorttimedtn=false;
      }
      this.typevariable=arr.name;
  }

  shorttimedtn:boolean=false
  shortdtn:boolean=false;
  shorttime:any='Select';
  dropdownOpenshort(){
    this.shortdtn=true;
  }
  Changeselectshort(arr){
    this.shorttime=arr.name;
    this.shortdtn=false;
  }

  array4:any=[
    {
      id: 0,
      name: 'First Half',
    },
    {
      id: 1,
      name: 'Second Half',
    },

  ];

  halftimedtn:boolean=false;
  halfdtn:boolean=false;
  halftime:any="Select";
  dropdownOpenhalf(){
    this.halfdtn=true;
  }

  Changeselecthalf(arr){
    this.halftime=arr.name;
    this.halfdtn=false;

  }

}
