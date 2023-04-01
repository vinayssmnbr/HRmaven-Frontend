import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from './custom.validator';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {
  forgetform = new FormGroup({
    password : new FormControl("",[Validators.required,Validators.minLength(8)]),
    confirm : new FormControl("",[Validators.required])
  },{
    validators:matchpassword
  });

  get password(){
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
}
