import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService} from '../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  ngOnInit() {
    let counter = 1;
    setInterval(() => {
      const radioBtn = document.getElementById(`radio${counter}`) as HTMLInputElement;
      radioBtn.checked = true;
      counter++;
      if (counter > 4) {
        counter = 1;
      }
    }, 5000);
  }

constructor(public fb1:FormBuilder,public router : Router,public userService:UserService){}
  loginForm = new FormGroup({
    email : new FormControl('',[ Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(5)])
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





submit(){
  this.router.navigate(['/dashboard'])
}

onSubmit(data1:any){
  console.log(this.loginForm.value);
  this.userService.users(data1).subscribe((res: any)=>{
    this.userService.users(this.loginForm)
    console.log("login User: ", res)
    console.log("login User: ", res.token)


  })

}



}



