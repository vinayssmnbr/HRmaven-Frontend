import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { matchpassword } from './custom.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  sigupform = new FormGroup({
    email : new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
    password : new FormControl("",[Validators.required,Validators.minLength(8)]),
    confirm : new FormControl("",[Validators.required]),
    username: new FormControl("",[Validators.required])
  },{
    validators:matchpassword
  });

  get password(){
    return this.sigupform.get('password');
  }

  get email(){
    return this.sigupform.get("email");
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
}
