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
import { UserService } from '../service/user.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    public fb1: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService,
    public userService: UserService
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
    let counter = 1;
    setInterval(() => {
      const radioBtn = document.getElementById(
        `radio${counter}`
      ) as HTMLInputElement;
      if (radioBtn) {
        radioBtn.checked = true;
        counter++;
        if  (counter > 4) {
          counter=1;
        }
      }
      
    }, 5000);
    //GOOGLE LOGIN
    this.activatedRoute.queryParams.subscribe((params) => {
      // console.log(params);
      const token = params['token'];
      console.log(token);
      if (token && token != 'undefined') {
        this.cookie.set('token', token);
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['login']);
      }
    });

    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
    // this.userService.allDataLogin();
  }
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

  get email() {
    return this.forgotPassword.get('email');
  }

  submit() {
    this.router.navigate(['/dashboard']);
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
