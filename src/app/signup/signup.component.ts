import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { matchpassword } from './custom.validator';
import { UserService} from '../service/user.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  ngOnInit() {
    let counter = 0;
    setInterval(() => {
      const radioBtn = document.getElementById(`radio${counter + 1}`) as HTMLInputElement;
      if (radioBtn) {
        radioBtn.checked = true;
        counter++;
        if (counter === 4) {
          counter = 0;
        }
      }
    }, 3000);
  }

  constructor(public userService:UserService, private router : Router){}

  noSpaces(control: FormControl) {
    if (control.value && control.value.trim().length === 0) {
      return { noSpaces: true };
    }
    return null;
  }


  sigupform = new FormGroup({
    email : new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
    password : new FormControl("",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-_]).{8,}$/)]),
    confirm : new FormControl("",[Validators.required]),
    username: new FormControl("",[Validators.required,Validators.pattern('^[A-Z]([a-zA-Z0-9.-_,]|[- @.#&!])*$')]),
    check: new FormControl("",[Validators.required]),
  },{
    validators:matchpassword
  });

  get password(){
    return this.sigupform.get('password');
  }

  get email(){
    return this.sigupform.get("email");
  }

  get username(){
    return this.sigupform.get("username");
  }

  showPassword = false;
showPasswordIcon = 'fa-eye-slash';

togglePasswordVisibility(passwordInput: any) {
  this.showPassword = !this.showPassword;
  this.showPasswordIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
  passwordInput.type = this.showPassword ? 'password' : 'text';
}

showPassword1= false;
showPasswordIcon1 = 'fa-eye-slash';

togglePassword(passwordInpu: any) {
  this.showPassword1 = !this.showPassword1;
  this.showPasswordIcon1 = this.showPassword1 ? 'fa-eye-slash' : 'fa-eye';
  passwordInpu.type = this.showPassword1 ? 'password' : 'text';
}

onSubmit(data:any){
  console.log(this.sigupform.value);
  this.userService.saveUser(data).subscribe((result: any)=>{
  this.userService.saveUser(this.sigupform)
  console.log(result)
  this.submit();
  var today = new Date();
  var expire = new Date();

  expire.setTime(today.getTime() + 12*60*60*60*1000);
  console.log('inside');
      document.cookie ="token= "  + result.token + ";path=/" + ";expires=" + expire.toUTCString();
  console.log("result:",result)

  })
}
submit(){
  this.router.navigate(['/dashboard']) //your router URL need to pass it here
}

SignupByGoogle() {
  console.log('google');
  window.location.href = 'https://hrmaven.works/auth/google';
}

}
