import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

 constructor(private userService:UserService, private formBuilder: FormBuilder){}
  objectuserid = localStorage.getItem('emailid')
  // loginobjectid:any = ''

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
 ngOnInit(){
  this.organisationn =  localStorage.getItem('companyname');
  this.companyDetailsForm = this.formBuilder.group({

    headOffice: [''],
    description: ['']
  });

  this.personalDetailsForm = this.formBuilder.group({
    name:[''],
    personalemail: [''],
    phone: ['']
  });
      this.userService.getpersonals(this.objectuserid).subscribe((res: any) => {
        console.log("res account settings personaldataaaaa: ", res);

        console.log("res account settings personaldata: ", res.personaldata);
        console.log("res account settings personaldata: ", res.personaldata.headOffice);
        console.log("res account settings personaldata: ", res.personaldata.description);


        console.log("res account settings personaldata: ", res.useridd);


        this.employeename = res.personaldata.name;
        this.totalemployee = res.personaldata.domain;
        this.headOffice = res.personaldata.headOffice;
        this.phone = res.personaldata.phone;
        this.description = res.personaldata.description;
        this.profileimage = res.personaldata.profileimage;
        this.email_id = this.employeeemail.split("@")
      this.professional_email_id = this.email_id[0] + "@" + this.totalemployee

      });

    }

    updateData(data: any){
      this.userService.updatepersonals(this.objectuserid, data).subscribe((res: any) => {
        console.log("res account settings personaldata: ", res.personaldata);
        console.log("res account settings personaldata: ", res.personaldata.headOffice);

        console.log("res account settings personaldata: ", res.useridd);


        this.employeename = res.personaldata.name;
        // this.totalemployee = res.personaldata.noOfEmployee;
        this.description = res.personaldata.description;
        this.headOffice = res.personaldata.headOffice;
        this.phone = res.personaldata.phone;

      });
    }



    forgetpwd = new FormGroup({

      oldpassword:new FormControl('',[Validators.required,Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
      )]),
      password: new FormControl('',[Validators.required,Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
      )]),
      confirm: new FormControl('',[Validators.required,Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
      )]),

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




    objectid = localStorage.getItem('emailid');

    updateProfile(data: any){
      this.userService.updatepersonals(this.objectid,data).subscribe((res: any)=>{
        console.log("personaldataForm.value res: ", res);
        console.log("personaldataForm.value data: ", data);
       });
    }


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



}
