import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/user.service';
import { BehaviorSubject, filter } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  employeemail: any[] = [];
  emailEntered: any = '';
  //  emailExists: any[] = [];
  userEmail: any = '';
  emailExists = false;
  Invalid = false;
  loginLoader:boolean = false;


  constructor(
    public fb1: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService,
    public userService: UserService,
    // private cdRef: ChangeDetectorRef,
  ) {}
  incorrect:boolean=true;
  ngOnInit() {
    localStorage.setItem('personalDataSubmitted', JSON.stringify(true));
    this.userService.isFromLoginPage = false;
    // this.userService.isFromLoginPage = false;
    const storedemail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedemail && storedPassword) {
      this.loginForm.setValue({
        email: storedemail,
        password: storedPassword,
        Remember: true,
      });
    }
    // let counter = 0;
    // setInterval(() => {
    //   const radioBtn = document.getElementById(
    //     `radio${counter + 1}`
    //   ) as HTMLInputElement;
    //   if (radioBtn) {
    //     radioBtn.checked = true;
    //     counter++;
    //     if (counter === 4) {
    //       counter = 0;
    //     }
    //   }
    // }, 8000);
    //GOOGLE LOGIN

    this.activatedRoute.queryParams.subscribe((params) => {
      
      const token = params['token'];
      const id= params['hrid'];
      const email = params['email'];
      console.log(id,email);
      if(token == 'notfound')
      {
        this.cookie.delete('token');
        this.Invalid=!this.Invalid;
        this.incorrect=false;
        return;
      }
      if (token && token != 'undefined') {
        this.cookie.set('token', token);
        this.cookie.set('hr_id',id)
        this.cookie.set('email',email);
        this.cookie.set('role','hr');
        this.router.navigate(['/dashboard']);
      } else {
        this.cookie.delete('token');
        this.router.navigate(['/login']);
      }
    });

    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['dashboard']);
      // this.router.navigateByUrl('dashboard')
    }
    // this.userService.allDataLogin();
  }
  userdetail: any = '';
  usernotfound: any = '';

  checkEmail() {
    this.userService
      .getData(this.forgotPassword.controls['email'].value)
      .subscribe((res: any) => {
        // this.emailExists = false;
        console.log('message: ', res.message);

        if (res.message === 'user-found') {
          // this.userdetail = this.forgotPassword.controls['email'].value
          this.userdetail = res.message;
        } else if (res.message === 'user-not-found') {
          this.usernotfound = res.message;

        }

        this.employeemail = res;

        console.log('Response from API:', this.employeemail);
      });

    this.cookie.deleteAll();
  }

  email_data: any = '';

  //GOOGLE LOGIN
  loginwithGoogle() {
    console.log('google');
    window.location.href = 'https://hrmaven.works/auth/google';
  }


  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$'
        // '[a-zA-Z0-9]+\.[a-zA-Z0-9]+@gmail\.com'
        ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/
      ),
    ]),
    Remember: new FormControl(),
  });

  forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  showPassword = false;
  showPasswordIcon = 'fa-eye-slash';
  Forgotshow = false;
  EmailSent = false;

  togglePasswordVisibility(passwordInput: any) {
    this.showPassword = !this.showPassword;
    this.showPasswordIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    passwordInput.type = this.showPassword ? 'password' : 'text';
  }

  toggleForgot() {
    this.Forgotshow = !this.Forgotshow;
  }
  // toggleForgot1() {
  //   this.EmailSent = !this.EmailSent;
  // }

  toggleForgot1() {
    this.emailSent = !this.emailSent;
  }

  closeInvalid() {
    this.Invalid = !this.Invalid;
    this.loginForm.reset();
    // this.cdRef.detectChanges();
  }

  // LOGIN
  isLoggedIn = new BehaviorSubject<boolean>(false);

  get emailforgot() {
    return this.forgotPassword.get('email');
  }

  get emaill() {
    return this.loginForm.get('email');
  }

  get pwd() {
    return this.loginForm.get('password');
  }

  loader = false;
  submit() {

    this.loader = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

  // submissions
ress: any =''
  onSubmit(data: any) {
    this.loginLoader = true;
    console.log(this.loginForm.value);
    // const isFromLoginPage = true; // set the flag to true
    this.userService.users(data).subscribe((res: any) => {
      this.incorrect=true;
      localStorage.setItem('personalDataSubmitted', 'true');
      console.log("personalDataSubmitted value: ", JSON.stringify(res.personalDataSubmitted)); // Debugging statement
      if (res.personalDataSubmitted) {

      console.log("personalDataSubmitted value: ", JSON.stringify(res.personalDataSubmitted));
        localStorage.setItem('personalDataSubmitted', 'true');
      }
      console.log("ress: ", res.username)
      this.cookie.set("company",res.username)
      localStorage.setItem('companyname', res.username);
      // console.log("isFromLoginPage: ", isFromLoginPage);
      // localStorage.setItem("isFromLoginPage",JSON.stringify(isFromLoginPage))

      this.userService.users(this.loginForm);
      console.log('login User: ', res);
      console.log('login User: ', res.noOfEmployee);
      this.personalData = res.noOfEmployee;
      console.log('login personalData: ', this.personalData);
      console.log('login User email: ', this.loginForm.controls['email'].value);
      if (res.message == 'login successful') {
        var today = new Date();
        var expire = new Date();

        expire.setTime(today.getTime() + 12 * 60 * 60 * 1000);
        console.log('inside');
        document.cookie =
          'token= ' +
          res.token +
          ';path=/' +
          ';expires=' +
          expire.toUTCString();
        if (this.loginForm.value.Remember) {
          localStorage.setItem('email', this.loginForm.value.email);
          localStorage.setItem('password', this.loginForm.value.password);

        }

        console.log(res._id);
        this.cookie.set('hr_id', res._id);
        this.cookie.set('role', 'hr');
              localStorage.setItem('personalDataSubmitted', 'true');
        this.submit();
      } else if (res.message == 'Invalid' || res.message == "Employee email or status invalid") {
        console.log('haha');
        this.Invalid = !this.Invalid;
        // this.cdRef.detectChanges();
      }
      localStorage.setItem(
        'LoggedInName: ',
        this.loginForm.controls['email'].value
      );

      localStorage.setItem('emailid', this.loginForm.controls['email'].value);
      // localStorage.setItem('companyname', res.username);
      this.loginLoader = false;
    });
    // this.personalData = localStorage.getItem('totalemployee');
    // this.userService.isnotFromSignupPage = true;

    // if (this.userService.isnotFromSignupPage) {
    //   this.formSubmitted = false;
    //   console.log("isFromSignupPage: ", this.userService.isnotFromSignupPage);
    // } else {
    //   this.formSubmitted = true;
    // }
  }
  personalData: any = '';
  formSubmitted: any = '';
  emailSent: boolean = false;
  userNotFound: boolean = false;
  // ForgetEmailSubmit(data: any) {
  //   console.log('Forget Password Email');
  //   console.log(data);

  //   this.userService.getData(data.email).subscribe((res: any) => {
  //     console.log("message: ", res.message);

  //     if (res.message === 'user-found') {
  //       this.userService.ForgotEmail(data).subscribe((res: any) => {
  //         this.userService.ForgotEmail(this.forgotPassword);
  //         console.log('response:' + Object.values(res));
  //       });
  //       this.Forgotshow = !this.Forgotshow;
  //       setTimeout(() => {
  //         this.EmailSent = !this.EmailSent;
  //       }, 500);
  //       // this.emailSent = true;
  //     } if (res.message === 'email-id not found') {
  //       this.usernotfound = res.message;
  //       console.log("usernotfound: ",this.usernotfound)
  //               this.usernotfound = true;

  //     }

  //     this.employeemail = res;

  //     console.log('Response from API:', this.employeemail);
  //   });

  //   this.userService.ForgotEmail(data).subscribe((res: any) => {
  //     this.userService.ForgotEmail(this.forgotPassword);
  //     console.log('response:' + res);
  //   });
  //   if(!this.userNotFound){
  //   this.Forgotshow = !this.Forgotshow;
  //   setTimeout(() => {
  //     this.EmailSent = !this.EmailSent;
  //   }, 500);
  // }
  // }
  loaderforget = false;
  ForgetEmailSubmit(data: any) {
    console.log('Forget Password Email');
    console.log(data);

    this.userService.getData(data.email).subscribe((res: any) => {
      console.log('message: ', res.message);

      if (res.message === 'user-found') {
        this.loaderforget = true;
        this.userService.ForgotEmail(data).subscribe((res: any) => {
          this.userService.ForgotEmail(this.forgotPassword);
          console.log('response:' + Object.values(res));
          this.Forgotshow = false; // Close the "Forgot Password" modal
          this.emailSent = true; // Display the "Reset Password Link Sent" message
          this.loaderforget = false;
        });
      } else if (res.message === 'email-id not found') {
        this.usernotfound = res.message;
        console.log('usernotfound: ', this.usernotfound);
        this.usernotfound = true;

      }

      this.employeemail = res;

      console.log('Response from API:', this.employeemail);
    });
  }
  //   Space(event:any){
  //     if(event.target.selectionStart === 0  && event.code == "Space"){
  //      event.preventDefault();
  //     }
  //  }
  onKeyUp(event): void {
    event.target.value = event.target.value.trim();
  }
}
