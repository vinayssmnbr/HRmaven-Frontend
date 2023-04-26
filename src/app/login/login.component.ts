import { Component } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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

  constructor(
    public fb1: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService,
    public userService: UserService
  ) {}

  ngOnInit() {

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   // force a page refresh on navigation end
    //   window.location.reload();
    // });

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
      // console.log(params);
      const token = params['token'];
      console.log(token);
      if (token && token != 'undefined') {
        this.cookie.set('token', token);
        this.router.navigate(['dashboard']);
      } else {
        this.cookie.delete('token');
        this.router.navigate(['login']);
      }
    });

    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
    // this.userService.allDataLogin();
    
  }
  userdetail: any = '';
  usernotfound: any = '';

  checkEmail(){
  
      // this.userService.getData(this.forgotPassword.controls['email'].value).subscribe((res: any) => {
      //   // this.emailExists = false;
      //     console.log("message: ",res.message);

      //   if(res.message === 'user-found'){
      //     // this.userdetail = this.forgotPassword.controls['email'].value
      //     this.userdetail = res.message
      //   } else if(res.message === 'user-not-found'){
      //     this.usernotfound = res.message;
      //   }

      //   this.employeemail = res;
      
      
      //   console.log('Response from API:', this.employeemail);
      // });   
  }

  email_data: any = '';

  
  //GOOGLE LOGIN
  loginwithGoogle() {
    console.log('google');
    window.location.href = 'https://hrmaven.works/auth/google';
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
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

  get emaill(){
    return this.loginForm.get("email");
  }

  get pwd(){
    return this.loginForm.get("password");
  }

  loader=false;
  submit() {
    this.loader = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

  // submissions

  onSubmit(data: any) {
    console.log(this.loginForm.value);

    this.userService.users(data).subscribe((res: any) => {
      this.userService.users(this.loginForm);
      console.log('login User: ', res);
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
        this.submit();
      } else if (res.message == 'Invalid') {
        console.log('haha');
        this.Invalid = !this.Invalid;
      }
      localStorage.setItem(
        'LoggedInName: ',
        this.loginForm.controls['email'].value
      );


    });
  }
  ForgetEmailSubmit(data: any) {
    console.log('Forget Password Email');
    console.log(data);

    this.userService.getData(data.email).subscribe((res: any) => {
      console.log("message: ", res.message);
  
      if (res.message === 'user-found') {
        this.userService.ForgotEmail(data).subscribe((res: any) => {
          this.userService.ForgotEmail(this.forgotPassword);
          console.log('response:' + Object.values(res));
        });
        this.Forgotshow = !this.Forgotshow;
        setTimeout(() => {
          this.EmailSent = !this.EmailSent;
        }, 500);
      } else if (res.message === 'email-id not found') {
        this.usernotfound = res.message;
      }
  
      this.employeemail = res;
  
      console.log('Response from API:', this.employeemail);
    });

    this.userService.ForgotEmail(data).subscribe((res: any) => {
      this.userService.ForgotEmail(this.forgotPassword);
      console.log('response:' + res);
    });
    this.Forgotshow = !this.Forgotshow;
    setTimeout(() => {
      this.EmailSent = !this.EmailSent;
    }, 500);
 
  }

 

}
