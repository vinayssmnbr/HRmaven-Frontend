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

    let counter = 0;
    setInterval(() => {
      const radioBtn = document.getElementById(`radio${counter + 1}`) as HTMLInputElement;
      if (radioBtn) {
        radioBtn.checked = true;
        counter++;
        if (counter === 4) {
          counter =0;
        }
      }
    }, 3000);
    //GOOGLE LOGIN
    this.activatedRoute.queryParams.subscribe((params) => {
      // console.log(params);
      const token = params['token'];
      console.log(token);
      if (token) {
        this.cookie.set('token', token);
        this.router.navigate(['dashboard']);
      }
    });

    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }
  //GOOGLE LOGIN
  loginwithGoogle() {
    console.log('google');
    window.location.href = 'https://hrm21.onrender.com/auth/google';
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
      ),
    ]),
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
    this.showPasswordIcon = this.showPassword ?  'fa-eye-slash':'fa-eye';
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


onSubmit(data:any){
  console.log(this.loginForm.value);
  this.userService.users(data).subscribe((res: any)=>{
    this.userService.users(this.loginForm)



    console.log("login User: ", res)
    console.log("login User email: ", this.loginForm.controls['email'].value);
    if(res.message=="login successful") {
      var today = new Date();
    var expire = new Date();

    expire.setTime(today.getTime() + 12*60*60*1000);
    console.log('inside');
        document.cookie ="token= "  + res.token + ";path=/" + ";expires=" + expire.toUTCString();
      this.submit();
    }
    else if(res.message=="Invalid"){
      console.log("haha");
      this.Invalid=!this.Invalid;


    }
    localStorage.setItem('LoggedInName: ', this.loginForm.controls['email'].value);


  })

}
ForgetEmailSubmit(data:any)
{
  console.log("Forget Password Email");
  console.log(data);

  this.userService.ForgotEmail(data).subscribe((res:any)=>{
    this.userService.ForgotEmail(this.forgotPassword);
    console.log("response:"+res);
  })
  this.Forgotshow=!this.Forgotshow;
  setTimeout(()=>{
    this.EmailSent=!this.EmailSent;

  },1000);

}




}



