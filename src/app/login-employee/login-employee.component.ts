import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// import { UserService } from '../service/user.service';
import { EmployeeService } from '../service/employee.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.css'],
})
export class LoginEmployeeComponent {
  employeemail: any[] = [];
  emailEntered: any = '';
  //  emailExists: any[] = [];
  userEmail: any = '';
  emailExists = false;
  emploginLoader:boolean = false;

  constructor(
    public fb1: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public cookie: CookieService,
    public employeeService: EmployeeService // public userService: UserService
  ) {}

  ngOnInit() {
    const storedemail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedemail && storedPassword) {
      this.loginForm.setValue({
        email: storedemail,
        password: storedPassword,
        Remember: true,
      });
    }

    // this.activatedRoute.queryParams.subscribe((params) => {
    // //   // console.log(params);
    //   const token = params['token'];
    //   console.log(token);
    //   if (token && token != 'undefined') {
    //     this.cookie.set('token', token);
    //     this.router.navigate(['employee/dashboard']);
    //   } else {
    //     this.cookie.delete('token');
    //     this.router.navigate(['loginemp']);
    //   }
    // });

    if (this.employeeService.isUserLoggedIn()) {
      this.router.navigate(['emp-dashboard']);
    }

    this.cookie.deleteAll();
    // this.userService.allDataLogin();
  }
  userdetail: any = '';
  usernotfound: any = '';

  checkEmail() {
    // this.userService.getData('atulgupta.kr7@gmail.com').subscribe((res: any) => {
    // this.userService.getData(this.forgotPassword.controls['email'].value).subscribe((res: any) => {
    // this.emailExists = false;
    // console.log("message: ",res.message);
    // if(res.message === 'user-found'){
    // this.userdetail = this.forgotPassword.controls['email'].value
    // this.userdetail = res.message
    // } else if(res.message === 'user-not-found'){
    // this.usernotfound = res.message;
    // }
    // this.employeemail = res;
    // console.log('Response from API:', this.employeemail);
    // });
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
  Invalid = false;

  togglePasswordVisibility(passwordInput: any) {
    this.showPassword = !this.showPassword;
    this.showPasswordIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    passwordInput.type = this.showPassword ? 'password' : 'text';
  }

  toggleForgot() {
    this.Forgotshow = !this.Forgotshow;
  }
  toggleForgot1() {
    this.EmailSent = !this.EmailSent;
  }

  closeInvalid() {
    this.Invalid = !this.Invalid;
    this.loginForm.reset();
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
      this.router.navigate(['/emp-dashboard']);
    }, 2000);
  }

  // submissions
  obj: any;
  onSubmit(data: any) {
    this.emploginLoader= true;
    console.log(this.loginForm.value);

    this.employeeService.users(data).subscribe((res: any) => {
      this.employeeService.users(this.loginForm);
      this.obj = res.role;
      localStorage.setItem('role', this.obj);
      console.log('login User: ', res);
      console.log('login User email: ', this.loginForm.controls['email'].value);
      if (res.message == 'login successful') {
        var today = new Date();
        var expire = new Date();

        expire.setTime(today.getTime() + 12 * 60 * 60 * 1000);
        console.log('inside');
        document.cookie =
          'emp-token= ' +
          res.token +
          ';path=/' +
          ';expires=' +
          expire.toUTCString();
        if (this.loginForm.value.Remember) {
          localStorage.setItem('email', this.loginForm.value.email);
          localStorage.setItem('password', this.loginForm.value.password);
        }
        console.log(res);
        this.cookie.set('token', res.token);
        this.cookie.set('id', res.empId);
        this.cookie.set('role', 'employee');
        this.employeeService.welcome =res.firstVisit;
        this.submit();
      } else if (res.message == 'Invalid') {
        console.log('haha');
        this.Invalid = !this.Invalid;
      }
      localStorage.setItem(
        'LoggedInName',
        this.loginForm.controls['email'].value
      );
    this.emploginLoader= false;

    });
  }
  ForgetEmailSubmit(data: any) {
    console.log('Forget Password Email');
    console.log(data);

    // this.userService.getData(data.email).subscribe((res: any) => {
    //   console.log("message: ", res.message);

    //   if (res.message === 'user-found') {
    //     this.userService.ForgotEmail(data).subscribe((res: any) => {
    //       this.userService.ForgotEmail(this.forgotPassword);
    //       console.log('response:' + Object.values(res));
    //     });
    //     this.Forgotshow = !this.Forgotshow;
    //     setTimeout(() => {
    //       this.EmailSent = !this.EmailSent;
    //     }, 500);
    //   } else if (res.message === 'email-id not found') {
    //     this.usernotfound = res.message;
    //   }

    //   this.employeemail = res;

    //   console.log('Response from API:', this.employeemail);
    // });
  }

  onKeyUp(event): void {
    event.target.value = event.target.value.trim();
  }
}
