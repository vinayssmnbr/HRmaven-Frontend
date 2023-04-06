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
import { UserService} from '../service/user.service';
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
    let counter = 1;
    setInterval(() => {
      const radioBtn = document.getElementById(`radio${counter}`) as HTMLInputElement;
      if (radioBtn) {
        radioBtn.checked = true;
        counter++;
        if (counter > 4) {
          counter = 1;
        }
      }
    }, 5000);

    this.activatedRoute.queryParams.subscribe((params) => {
      // console.log(params);
      const token = params['token'];
      console.log(token);
      if (token) {
        this.cookie.set('token', token);
        this.router.navigate(['dashboard']);
      }
    });
    if(this.userService.isUserLogged()){
      this.router.navigate(['dashboard'])
      }
  }
  //Google Login
  loginwithGoogle() {
    console.log('google');
    window.location.href = 'http://localhost:3000/auth/google';
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
  showPasswordIcon = 'fa-eye';
  Forgotshow = false;
  EmailSent = false;
  Invalid = false;

  togglePasswordVisibility(passwordInput: any) {
    this.showPassword = !this.showPassword;
    this.showPasswordIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  toggleForgot() {
    this.Forgotshow = !this.Forgotshow;
  }
  toggleForgot1() {
    this.EmailSent = !this.EmailSent;
  }

closeInvalid(){
  this.Invalid=!this.Invalid;
  this.loginForm.reset();
}

  loginuser(data: any){
    this.userService.users(data).subscribe((res:any)=>{
      this.userService.users(data)
      console.log("login User: ",res)

      var today = new Date();
      var expire = new Date();

      expire.setTime(today.getTime() + 3600000*24*15);
      document.cookie = "name= " + res.Token + ";path=/" + ";expires=" + expire.toUTCString();
    })
  }
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
    if(res.message=="login successful") {
      this.submit();
    }
    else if(res.message=="Invalid"){
      console.log("haha");
      this.Invalid=!this.Invalid;


    }

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
