import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { matchpassword } from './custom.validator';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
// import { DashService } from '../../app/dashboard-module/shared/dash.service';
// import { DashService } from '../dashboard-module/shared/dash.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  formGroup: FormGroup;
  subject: Subject<any> = new Subject();
  formBuilder: FormGroup<any>;
  lengthCheck: boolean = false;
  specialCharCheck: boolean = false;
  spaceCheck: boolean = false;
  capitalCheck: boolean = false;
  smallCheck: boolean = false;
  numericalCheck: boolean = false;

  is_visible = false;
  password = '';

  checkPassword() {
    const input = this.password.trim();
    this.lengthCheck = input.length >= 8;
    // const lengthCheck2 = input.length <= 10;
    this.numericalCheck = input.match(/[0-9]/i) ? true : false;
    this.specialCharCheck = input.match(/[^A-Za-z0-9-' ']/i) ? true : false;
    this.spaceCheck = input.match(' ') ? true : false;
    this.capitalCheck = input.match(/[A-Z]/) ? true : false;
    this.smallCheck = input.match(/[a-z]/) ? true : false;
    //  console.log(numericalCheck,  this.specialCharCheck, spaceCheck, capitalCheck, smallCheck)
    document.getElementById('count').innerText = `Length: ${input.length}`;
  }

  toggleVisibility() {
    const input = document.getElementById('password') as HTMLInputElement;
    const see = document.getElementById('see');

    if (this.is_visible) {
      input.type = 'password';
      this.is_visible = false;
      see.style.color = 'gray';
    } else {
      input.type = 'text';
      this.is_visible = true;
      see.style.color = '#262626';
    }
  }

  ngOnInit() {
    // this.userService.isFromSignupPage = this.route.snapshot.url[0].path === 'signup';
    this.userService.isFromSignupPage = true;

    this.subject.pipe(debounceTime(3000)).subscribe(() => {
      // this.formGroup.controls['username'].setValidators([Validators.pattern('^[A-Z]\'?[- a-zA-Z]( [a-zA-Z]*')])
      // this.formGroup.controls['username'].setValidators([Validators.pattern('^[A-Z]\'?[- a-zA-Z]( [a-zA-Z]*')])
      this.formGroup.controls['username'].setValidators([
        Validators.pattern('^(?! )[A-Za-z][0-9a-zA-Z]*(?<! )$'),
      ]);
    });

    // let counter = 0;
    // setInterval(() => {
    //   const radioBtn = document.getElementById(`radio${counter + 1}`) as HTMLInputElement;
    //   if (radioBtn) {
    //     radioBtn.checked = true;
    //     counter++;
    //     if (counter === 4) {
    //       counter = 0;
    //     }
    //   }
    // }, 8000);
    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) {}

  noSpaces(control: FormControl) {
    if (control.value && control.value.trim().length === 0) {
      return { noSpaces: true };
    }
    return null;
  }

  sigupform = new FormGroup(
    {
      // email : new FormControl("",[Validators.required,Validators.pattern('^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$')]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$'
        ),
      ]),
      // email : new FormControl("",[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
        ),
      ]),
      // password : new FormControl("",[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/)]),
      // password : new FormControl(""),

      // confirm : new FormControl("",[Validators.required]),
      // confirm : new FormControl(""),
      // username: new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z]*')]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9. ]+$'),
      ]),

      check: new FormControl('', [Validators.required]),
    },
    {
      validators: matchpassword,
    }
  );

  // get password(){
  //   return this.sigupform.get('password');
  // }

  // get email(){
  //   return this.sigupform.get("email");
  // }

  // get username(){
  //   return this.sigupform.get("username");
  // }

  get fun() {
    return this.sigupform.controls;
  }

  showPassword = false;
  showPasswordIcon = 'fa-eye-slash';

  togglePasswordVisibility(passwordInput: any) {
    this.showPassword = !this.showPassword;
    this.showPasswordIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    passwordInput.type = this.showPassword ? 'password' : 'text';
  }

  showPassword1 = false;
  showPasswordIcon1 = 'fa-eye-slash';

  togglePassword(passwordInpu: any) {
    this.showPassword1 = !this.showPassword1;
    this.showPasswordIcon1 = this.showPassword1 ? 'fa-eye-slash' : 'fa-eye';
    passwordInpu.type = this.showPassword1 ? 'password' : 'text';
  }
  emailId: any = '';
  orgname: any = '';
  emailExists: boolean = false;
  emailnotExists: boolean = false;
  usernameExists: boolean = false;

  checkUsernameInput() {
    this.orgname = this.sigupform.controls['username'].value;
    this.userService.getUsernameData(this.orgname).subscribe((res: any) => {
      console.log('message: ', res);
      console.log('message email: ', res.message);
      console.log('message email: ', res.email);
      if (res.message === 'user-found') {
        this.usernameExists = true;
        this.fun['username'].setErrors({ usernameExists: true });
      } else {
        this.usernameExists = false;
        this.fun['username'].setErrors(null);
        this.fun['username'].markAsTouched(); // Mark the control as touched to trigger validation messages
      }
    });
  }

  checkEmailInput() {
    this.emailId = this.sigupform.controls['email'].value;
    this.userService.getData(this.emailId).subscribe((res: any) => {
      console.log('message: ', res);
      console.log('message email: ', res.message);
      console.log('message email: ', res.email);
      if (res.message === 'user-found') {
        this.fun['email'].setErrors({ emailExists: true });
      } else {
        this.fun['email'].setErrors(null);
        this.fun['email'].markAsTouched(); // Mark the control as touched to trigger validation messages
      }
    });
  }
  orgnisation: any = '';

  onSubmit(data: any) {
    console.log(this.sigupform.value);
    this.userService.saveUser(data).subscribe((result: any) => {
      this.userService.saveUser(this.sigupform);
      console.log(result);
      this.submit();
      var today = new Date();
      var expire = new Date();

      expire.setTime(today.getTime() + 12 * 60 * 60 * 60 * 1000);
      console.log('inside');
      document.cookie =
        'token= ' +
        result.token +
        ';path=/' +
        ';expires=' +
        expire.toUTCString();
      console.log('result:', result);
      console.log('object_id:', result.user._id);
      // localStorage.setItem('email', this.sigupform.controls['email'].value);
      this.cookie.set('hr_id', result._id);
      this.cookie.set('role', result.role);
      localStorage.setItem('emailid', this.sigupform.controls['email'].value);
      this.orgnisation = result.username;
      localStorage.setItem('companyname', this.orgnisation);
      // localStorage.setItem('emailid', this.sigupform.controls['email'].value);
      this.orgnisation = this.sigupform.controls['username'].value;
      localStorage.setItem(
        'companyname',
        this.sigupform.controls['username'].value
      );
    });
  }
  submit() {
    this.router.navigate(['/dashboard']); //your router URL need to pass it here
  }

  SignupByGoogle() {
    console.log('google');
    window.location.href = 'https://hrmaven.works/auth/google';
  }

<<<<<<< HEAD
  expire.setTime(today.getTime() + 12*60*60*60*1000);
  console.log('inside');
      document.cookie ="token= "  + result.token + ";path=/" + ";expires=" + expire.toUTCString();
  console.log("result:",result)
  console.log("object_id:",result.user._id)
    // localStorage.setItem('email', this.sigupform.controls['email'].value);
    this.cookie.set('hr_id',result._id);
    this.cookie.set('role',result.role);
    localStorage.setItem('emailid',this.sigupform.controls['email'].value);
    this.orgnisation = result.username
    localStorage.setItem('companyname', this.orgnisation);
    // localStorage.setItem('emailid', this.sigupform.controls['email'].value);
    this.orgnisation = this.sigupform.controls['username'].value;
    localStorage.setItem('companyname', this.sigupform.controls['username'].value);

  })
}
submit(){
  this.router.navigate(['/dashboard']) //your router URL need to pass it here
}

SignupByGoogle() {
  console.log('google');
  window.location.href = 'https://hrmaven.works/auth/google';
}


onKeyUp(event): void {
  event.target.value = event.target.value.trim()

}
=======
  onKeyUp(event): void {
    event.target.value = event.target.value.trim();
  }
>>>>>>> d769500bd0222c061c440157e0afdb3b131d7a73
  // event.target.value.replace(/[^A-Za-z0-9-,.;'&/.() ]|^ /g,'').trim()

  onKeyDown(): void {
    // When the user starts to type, remove the validator
    this.formGroup.controls['username'].clearValidators();
  }

  Space(event: any) {
    if (event.target.selectionStart === 0 && event.code == 'Space') {
      event.preventDefault();
    }
  }

  // onOrgNameInput(){
  //   this.checkOrganizationNameExists(this.organizationName).subscribe((response)=>{
  //     this.orgNameExists = response.exists;
  //   })
  // }

  // usernameExists = false;
  // username:any;
  // checkUsernameExists(){
  //   this.username = this.formGroup.controls['username'].value;
  //   console.log('us',this.username);
  //   this.userService.getCompanyName(this.username)
  //   .subscribe((response:any) =>{
  //     console.log('check',response);
  //     if(response.flag){
  //       this.usernameExists = true;
  //       console.log(response.message);
  //     }else{
  //       this.usernameExists = false;
  //       console.log(response.message)
  //     }
  //   });

  // }

  // emailExists = false;
  // email:any;
  // checkEmailExists(){
  //   this.email = this.formGroup.controls['email'].value;
  //   console.log('we',this.email);
  //   this.userService.getRegisteredEmail(this.email)
  //   .subscribe((response:any)=>{
  //     console.log('checkemail',response);
  //     if(response.flag){
  //       this.emailExists = true;
  //       console.log(response.message)
  //     }else{
  //       this.emailExists = false;
  //       console.log(response.message)
  //     }
  //   });
  // }
}
