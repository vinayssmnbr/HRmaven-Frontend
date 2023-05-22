import { Component, Input } from '@angular/core';
import { DashService } from '../../shared/dash.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent {
  @Input() item: any
  fileName: string = '';
  jobrecord: any[] = [];
  statusFilter: string = 'all';

  constructor(private dashService: DashService) {
    dashService.activeComponent = 'job-details';
    dashService.headerContent = '';
  }
  ngOnInit() {
    this.item = this.dashService.getSelectedJobDetail();
    console.log('select1', this.item);

    this.fetchJobVecancies();


  }

  id: any = 'all';

  candidate: any[] = []
  selectedPdfFile: any = '';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
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
    // this.onUpload();


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
  progress: boolean = false
  public selectedFile: File | null = null;
  fileurl: any;

  async onFileSelected(event: any) {
    console.log(event.target.value);
    
    this.selectedFile = await event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
    this.progress = true
    console.log("test11")
    this.onUpload(this.selectedFile);
  }

  async onUpload(file, changeFile = true) {
    console.log('adarsh',file);
    this.selectedPdfFile = file;
    if(changeFile){
       return 'file selected'
    }
    try{
      let response = await this.dashService.uploaded(file);;
      this.progress = false;
      return response.url;
    }catch(err){
      console.log(err);
      this.progress = false;
    }
    // this.dashService.uploaded(file).then(
    //   (res) => {
    //     this.progress = false;
    //     this.newcandidateform.patchValue({
    //       url: res && res.url,
    //     });
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.progress = false;
    //   }
    // );
  }
  
  
  

   
  //Another method 

  // onfileselected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   this.fileName = this.selectedFile ? this.selectedFile.name : null;
  // }

  // onUpload(){
  //   console.log(this.selectedFile);
  //   if(this.selectedFile!=null){
  //     this.progress=true;
  //     this.dashService.uploaded(this.selectedFile).then(() => {
  //     console.log('File uploaded successfully.', this.dashService.fileUrl);
  //     this.dashService.fileUrl;
  //     this.fileurl = this.dashService.fileUrl;
  //     this.newcandidateform.value.url = this.dashService.fileUrl;
  //     this.uploadform();
     
  //   });
  // }
  //   else{
  //     this.uploadform();
      
  //   }
  // }


  // uploadform(){
  //   this.progress=true;
  //   this.newcandidateform.value.url = this.fileurl;
  
  //   this.dashService.addCandidate(this.newcandidateform.value).subscribe((res) => {
  //     console.log(res)
  //     this.progress=false;
  //   })
  
    
  // }


  // loading:boolean=false
  async tabChange1() {
    // this.loading=true
    // let data = this.newcandidateform.value;
    let data = { ...this.newcandidateform.value }
    let url=await this.onUpload(this.selectedPdfFile, false)
    data['url']=url
    this.dashService.addCandidate(data).subscribe((result) => {
      console.log(result, "candidate added>>>>")
      // this.newcandidateform.reset();
      // this.loading=false
      // this. fetchJobVecancies();

    });
    this.newcandidateform.reset()
    this. fetchJobVecancies();
    // this.onUpload();
  }


  fetchJobVecancies() {
    this.dashService.getCandidate().subscribe((data: any) => {
      console.log('hbhvdhsdh', data);
      this.candidate = data
    });
  }

 

 
}
