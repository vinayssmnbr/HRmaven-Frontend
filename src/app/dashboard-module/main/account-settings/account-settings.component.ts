import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from './custom.validator';
import { DashService } from '../../shared/dash.service';
import { CookieService } from 'ngx-cookie-service';
// import { EventEmitter } from 'stream';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  showSearchBox=false;
  date: any;
  greeting: any;
  employee: string;
  loggedInName: any = '';
  userEmail: any = '';
  name: any = '';
  profileDisplay: boolean = false;
  getUsersProfile: any = [];
  showNotifications = true;
  profileDisplayNot: boolean;
  hideNotifications = false;
 readonly= false;

 constructor(private userService:UserService, private formBuilder: FormBuilder,private dashService:DashService, private cookie:CookieService){
  this.companyDetailsForm = this.formBuilder.group({
    headOffice: [''],
    description: ['']
  });
  this.personalDetailsForm = this.formBuilder.group({
    name:[''],
    personalemail: [''],
    phone: ['', [Validators.required, this.phoneValidator]]
  });
 }
  objectuserid = localStorage.getItem('emailid')

 data: any = ''
 employeename: any = '';
 personaldata: any ='';
 headOffice: any = '';
 totalemployee: any = '';
 description: any = '';
 phone : any = '';
 profileimage: any = '';
 employeeemail = localStorage.getItem('emailid');
 companyDetailsForm: FormGroup;
 personalDetailsForm: FormGroup;

 specific_domain = "hrmaven.com"
 professional_email_id: any = ''
 email_id: any = ''
// email_id = this.employeeemail.split("@")
// professional_email_id = this.email_id[0] + "@" + this.organisationn
organisationn: any = '';

phoneValidator(control: FormControl) {
  const value = control.value;
  if (value && value.toString().length > 10) {
    control.setValue(value.toString().substring(0, 10)); // set the value to the first 10 digits
  }
  return null;
}

onInput(event: any) {
  const input = event.target as HTMLInputElement;
  if (input.value && input.value.length > 10) {
    input.value = input.value.substring(0, 10); // restrict the input to the first 10 digits
  }
  this.isInputDirty = true;
}
isEmptyInput = false;

  onFocusout() {
    const inputField = document.getElementById('oldp') as HTMLInputElement;
    this.isEmptyInput = inputField.value === '';
  }


isInputDirty = false;
// onBlur() {
//   const oldPassword = this.personalDetailsForm.get('oldpassword');
//   if (!oldPassword.value) {
//     this.isInputDirty = false;
//   }
// }



 ngOnInit(){

  this.organisationn =  localStorage.getItem('companyname');
  console.log('this.organisationn:',this.organisationn)

  console.log('before getpersonals!! company name:', this.organisationn);
  this.userService.getpersonals(this.objectuserid).subscribe((res: any) => {
    console.log("res account settings personaldataaaaa: ", res);

    console.log("res account settings personaldata: ", res.personaldata);
    console.log("res account settings personaldata: ", res.personaldata.headOffice);
    console.log("res account settings personaldata description: ", res.personaldata.description);


    console.log("res account settings personaldata: ", res.useridd);


    this.employeename = res.personaldata.name;
    this.totalemployee = res.personaldata.domain;
    this.headOffice = res.personaldata.headOffice;
    this.phone = res.personaldata.phone;
    this.description = res.personaldata.description;
    this.profileimage = res.personaldata.url;
    this.email_id = this.employeeemail.split("@")
  this.professional_email_id = this.email_id[0] + "@" + this.totalemployee

  });
  console.log("objectuserid: ",this.objectuserid)
  const oldPassword = this.personalDetailsForm.get('oldpassword');
  oldPassword.valueChanges.subscribe(() => {
    this.isInputDirty = true;
  });
  // this.organisationn =  this.cookie.get('company');
  // this.companyDetailsForm = this.formBuilder.group({

  //   headOffice: [''],
  //   description: ['']
  // });

  // this.personalDetailsForm = this.formBuilder.group({
  //   name:[''],
  //   personalemail: [''],
  //   phone: ['', [Validators.required, this.phoneValidator]]
  // });
  console.log('before getpersonals!!');
      this.userService.getpersonals(this.objectuserid).subscribe((res: any) => {
        // console.log("res account settings personaldataaaaa: ", res);

        // console.log("res account settings personaldata: ", res.personaldata);
        // console.log("res account settings personaldata: ", res.personaldata.headOffice);
        console.log("res account settings personaldatawww: ", res.personaldata.description);


        // console.log("res account settings personaldata: ", res.useridd);


        // this.employeename = res.personaldata.name;
        // this.totalemployee = res.personaldata.domain;
        // this.headOffice = res.personaldata.headOffice;
        // this.phone = res.personaldata.phone;
        this.description = res.personaldata.description;
      //   this.profileimage = res.personaldata.url;
      //   this.email_id = this.employeeemail.split("@")
      // this.professional_email_id = this.email_id[0] + "@" + this.totalemployee

      });
    

    }

   
    updateData(data: any){
      console.log('objectuserid2222: ', this.objectuserid)
      this.userService.updatepersonals(this.objectuserid, data).subscribe((res: any) => {
        console.log("res account settings personaldata222: ", res.personaldata);
        console.log("res account settings personaldata222: ", res.personaldata.headOffice);
        console.log("res account settings personaldata: ", res.useridd);

        this.employeename = res.personaldata.name;
        this.description = res.personaldata.description;
        this.headOffice = res.personaldata.headOffice;
        this.phone = res.personaldata.phone;
        this.profileimage = res.personaldata.url; // update profile image

        // Update the profile image in the UI
    
      });
    }




    forgetpwd = new FormGroup({

      oldpassword:new FormControl('',[Validators.required,Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
      )]),
      password: new FormControl('',[Validators.required,Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
      )]),
      confirm: new FormControl('',[Validators.required,]),

    },{
      validators:matchpassword
    }
    );


    newpassword(data:any)
    {
      console.log(data.value);
      this.userService.newpwdaccount(this.objectuserid,data).subscribe((res:any)=>{
        if(res=="changeit"){
          console.log(res);
        }

      });

  }
 
  get func(){
    return this.forgetpwd.controls;
  }
  isPasswordMatched = false;
  oldpassword: any = '';
    emailidd: any =''


    matchpwd() {
      const email = this.employeeemail;
       this.oldpassword = this.forgetpwd.controls['oldpassword'].value;
      this.isPasswordMatched = false;

      this.userService.getpwdmgt(email, this.oldpassword).subscribe((res: any) => {
        console.log("message: ", res);
        console.log("message email: ", res.message);

        if (res.message === 'Password matches') {
          this.isPasswordMatched = true;
        } 
        
        this.oldpassword = this.oldpassword;
      },
      //  (error: any) => {
      //   this.isPasswordMatched = true
      // }
      );
    }
 





    // objectid = localStorage.getItem('emailid');

    // updateProfile(data: any){
    //   this.userService.updatepersonals(this.objectid,data).subscribe((res: any)=>{
    //     console.log("personaldataForm.value res: ", res);
    //     console.log("personaldataForm.value data: ", data);
    //    });
    // }


  ReadMore: boolean = true;
  visible: boolean = false;
  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible;
     if(!this.hideNotifications){
      this.profileDisplay= false
    }
  }
  id: any = 'all';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }

  edit(){
   this.readonly=false;
  }

  showModal1=false;
  openModal1(){
    this.showModal1 = true;

  }

  closeModal1(){
    this.showModal1 = false;
  }

  showModal2=false;
  openModal2(){
    this.showModal2 = true;
  }

  closeModal2(){
    this.showModal2 = false;
  }


  showModal3=false;
  openModal3(){
    this.showModal3 = true;
  }

  closeModal3(){
    this.showModal3 = false;
    this.forgetpwd.reset();
    

  }
  onKeyUp(event): void {
    event.target.value = event.target.value.trim()

  }


  // forgetpwd: FormGroup;
  // get forgotformControl(){
  //   return this.forgetpwd.controls;
  //  }
  // //  get confirmpwd(){
  //   return this.forgetpwd.get("confirm")
  //  }

  //  get oldpwd(){
  //   return this.forgetpwd.get("oldpassword")
  //  }
   clearForm(){
    this.forgetpwd.reset();
   }
  //    oldpass:any ='';
  //   oldpasswordExists: boolean = false;

  //  checkPasswordInput() {
  //   this.oldpass = this.forgetpwd.controls['oldpassword'].value;
  //   this.userService.getOldpassword(this.oldpass).subscribe((res: any) => {
  //     console.log("message: ", res);
  //     console.log("message email: ", res.message);
  //     console.log("message email: ", res.email);
  //     if (res.message === 'user-found') {
  //       this.oldpasswordExists = true;
  //       this.forgetpwd.controls.oldpassword.setErrors({ 'oldpasswordExists': true });
  //     } else {
  //       this.oldpasswordExists = false;
  //       this.forgetpwd.controls.oldpassword.setErrors(null);
  //       this.forgetpwd.controls.oldpassword.markAsTouched(); // Mark the control as touched to trigger validation messages
  //     }
  //   });

  // selectedFile: File | null = null;
  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  //   if (this.selectedFile.type.split('/')[0] !== 'image') {
  //     console.error('Invalid file type. Please select an image.');
  //     return;
  //   }
  //   this.onUpload(this.profileimage);
  // }

  // upload: boolean = false;
  // progress: boolean = false;
  // imageurl: any;
  // onUpload(profileimage) {
  //   profileimage['email'] = this.profileimage.email;
  //   // profileimage['email'] = localStorage.getItem('emailId')
  //   this.userService.upload(this.selectedFile, profileimage.email).then((res: any) => {
  //     this.imageurl = this.userService.fileUrl;
  //     console.log('img', this.imageurl);
  //   });
  // }
  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.type.split('/')[0] !== 'image') {
      console.error('Invalid file type. Please select an image.');
      return;
    }
    this.onUpload();
  }

  upload: boolean = false;
  progress: boolean = false;
  imageurl: any;
  // @Output() profileImageEmitter = new EventEmitter<string>();

  onUpload() {
    const email = localStorage.getItem('emailid');
    console.log("email onUpload: ", email);
    const profileimage = { email: email };
    console.log("profileimage onUpload: ", profileimage);
    console.log("email after profileimage onUpload: ", email);

    profileimage['email'] = profileimage.email;
    console.log("profileimage['email'] onUpload: ", profileimage['email']);
    this.userService.upload(email,this.selectedFile).then((res: any) => {
      console.log("after upload userService email:",email)
      console.log("after upload userService this.selectedFile:",this.selectedFile)

      this.imageurl = this.userService.fileUrl;
      console.log('img', this.imageurl);
      this.profileimage = this.userService.fileUrl;
      // this.profileImageEmitter.emit(this.profileimage); // emit profileimage variable
    });

  }
  // onUpload() {
  //   const email = localStorage.getItem('emailid');
  //   this.userService.upload(this.selectedFile).then((res: any) => {
  //     this.imageurl = this.userService.fileUrl;
  //     console.log('img', this.imageurl);
  //   });
  // }


  }




