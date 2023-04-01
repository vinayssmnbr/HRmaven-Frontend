import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(public fb1:FormBuilder,private activatedRoute:ActivatedRoute,private http: HttpClient,private router: Router,){}

ngOnInit() {
  this.activatedRoute.queryParams.subscribe((params) => {
    // console.log(params);
    const token = params['token'];
    console.log(token);
    if (token) {
      localStorage.setItem('token', token);
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

  togglePasswordVisibility(passwordInput: any) {
    this.showPassword = !this.showPassword;
    this.showPasswordIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }


  toggleForgot(){
      this.Forgotshow= !this.Forgotshow;
  }

  onSubmit(data:any){

  }




}




