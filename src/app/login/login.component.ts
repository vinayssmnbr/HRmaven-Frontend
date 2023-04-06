import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(public fb1:FormBuilder,
  private activatedRoute:ActivatedRoute,
  private http: HttpClient,
  private router: Router,
  private cookie:CookieService,
  public userService:UserService

  ){}

ngOnInit() {
  this.activatedRoute.queryParams.subscribe((params) => {
    // console.log(params);
    const token = params['token'];
    console.log(token);
    if (token) {
      this.cookie.set('token',token);
      this.router.navigate(['dashboard']);
    }
  });
}
//Google Login
loginwithGoogle() {
  window.location.href = 'http://localhost:8000/auth/google';
}

  loginForm = new FormGroup({
    email : new FormControl('',[ Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(5)])
  })

  forgotPassword = new FormGroup({
    email : new FormControl('',[ Validators.required,Validators.email]),

  })

  showPassword = false;
  showPasswordIcon = 'fa-eye';
  Forgotshow=false;
   EmailSent=false;

  togglePasswordVisibility(passwordInput: any) {
    this.showPassword = !this.showPassword;
    this.showPasswordIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }


  toggleForgot(){
      this.Forgotshow= !this.Forgotshow;
  }
  toggleForgot1(){
    this.EmailSent= !this.EmailSent;
}


submit(){
  this.router.navigate(['/dashboard'])
}

// submissions

onSubmit(data1:any){
  console.log(this.loginForm.value);
  this.userService.users(data1).subscribe((res: any)=>{
    this.userService.users(this.loginForm)
    console.log("login User: ", res)
    console.log("login User: ", res.token)


  })



}
ForgetEmailSubmit(data:any)
{
  console.log("Forget Password Email");
  console.log(data);

  // this.userService.ForgotEmail(data).subscribe((res:any)=>{
  //   this.userService.ForgotEmail(this.forgotPassword);
  //   console.log("response:"+res);
  // })
  this.Forgotshow=!this.Forgotshow;
  setTimeout(()=>{
    this.EmailSent=!this.EmailSent;

  },1000);

}


}
