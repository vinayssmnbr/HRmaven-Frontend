import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from './custom.validator';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {
  constructor(private route: ActivatedRoute,public service:UserService,private router :Router) { };
  token: any;
  forgetform = new FormGroup({
    password: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/)]),
    confirm: new FormControl("", [Validators.required])
  }, {
    validators: matchpassword
  });

  get password() {
    return this.forgetform.get('password');
  }
  showPassword = false;
  showPasswordIcon = 'fa-eye';

  togglePasswordVisibility(passwordInput: any) {
    this.showPassword = !this.showPassword;
    this.showPasswordIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  showPassword1 = false;
  showPasswordIcon1 = 'fa-eye';
  togglePassword(passwordInpu: any) {
    this.showPassword1 = !this.showPassword1;
    this.showPasswordIcon1 = this.showPassword1 ? 'fa-eye-slash' : 'fa-eye';
    passwordInpu.type = this.showPassword1 ? 'text' : 'password';
  }




  //submission
  newpassword(data:any)
  {
    console.log(data.value);
    this.service.newpwd(data.value,this.token).subscribe((res)=>{
      if(res=="changeit"){
        console.log(res);
      }

    })
    this.router.navigate(['./login']);

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token']; // (+) converts string 'id' to a number
    });
  }

}
