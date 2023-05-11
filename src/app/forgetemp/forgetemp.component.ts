import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { Subject, } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-forgetemp',
  templateUrl: './forgetemp.component.html',
  styleUrls: ['./forgetemp.component.css']
})
export class ForgetempComponent {

  formGroup: FormGroup;
  subject: Subject<any> = new Subject()
  formBuilder: FormGroup<any>;
  lengthCheck:boolean = false;
  specialCharCheck:boolean = false;
  spaceCheck:boolean =  false;
  capitalCheck:boolean = false;
  smallCheck:boolean = false;
  numericalCheck:boolean = false;

  is_visible = false;
  password :any = '';

  checkPassword() {
    const input = this.password.trim();
    this.lengthCheck = input.length >= 8;
    this. numericalCheck = (input.match(/[0-9]/i)?true:false)
    this.specialCharCheck = (input.match(/[^A-Za-z0-9-' ']/i)?true:false);
    this.spaceCheck = (input.match(' ')?true:false);
    this.capitalCheck = (input.match(/[A-Z]/)?true:false);
    this.smallCheck = (input.match(/[a-z]/)?true:false);
    document.getElementById('count').innerText = `Length: ${input.length}`;


  }

  get fun(){
    return this.forgetformemp.controls;
  }



  expired:boolean = false;
  hasChangedPassword: boolean = false;
  errorMessage: string ='';
  constructor(private route: ActivatedRoute,public service:UserService,private router :Router) { };

  token: any;
  forgetformemp = new FormGroup({
    password: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/)]),
    confirm: new FormControl("", [Validators.required])
  });


  showPassword = false;
  showPasswordIcon = 'fa-eye-slash';

  togglePasswordVisibility(passwordInput: any) {
    this.showPassword = !this.showPassword;
    this.showPasswordIcon = this.showPassword ? 'fa-eye' : 'fa-eye-slash';
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }



  showPassword1 = false;
  showPasswordIcon1 = 'fa-eye-slash';
  togglePassword(passwordInpu: any) {
    this.showPassword1 = !this.showPassword1;
    this.showPasswordIcon1 = this.showPassword1 ? 'fa-eye' : 'fa-eye-slash';
    passwordInpu.type = this.showPassword1 ? 'text' : 'password';
  }
  hasError = false;
//  submission
newpasswordemp(data:any)
{
  console.log(data);
  this.service.newpwdemp(data,this.token).subscribe((res:any)=>{
    if(res=="changeitemp"){
      console.log(res);
    }

  });
  this.router.navigate(['./login-emp']);


}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token']; // (+) converts string 'id' to a number
      console.log("token", this.token);
    
    });
   

  
    this.service.newpwdemp(this.forgetformemp.value, this.token).subscribe({
      // next: (res: any) => {
      //   // if (res == 'changeit') {
      //   //   this.expired = true;
          
      //   //   console.log(res);
      //   // }
      //       console.log("res: ",res);

      //   this.router.navigate(['./login']);
      // },
        
      // error: (err) => {
      //   if ( err.error.message === 'Link has expired' 
      //   || err.error.message==='Reset password link has already been used') {
      //     this.expired = true;
      //     this.errorMessage = err.error.message;
      //   } 
      //   else  {
      //     // handle other errors
      //     this.errorMessage = err.error.message
      //     // this.errorMessage = 'Link has expired!!';
      //     // this.errorMessage =  'Link has expired';
          
      //   }
      // }
      next: (res: any) => {
        console.log("res: ", res);
        this.router.navigate(['./login-emp']);
      },
      error: (err) => {
        if (err.error.message === 'Link has expired' || err.error.message === 'Reset password link has already been used') {
          this.expired = true;
          this.errorMessage = err.error.message;
        } else {
          // handle other errors
          this.errorMessage = err.error.message;
        }
      }
    
    });
  
   
  } 
  
  onKeyUp(event): void {
  event.target.value = event.target.value.trim()

}

Space(event:any){
  if(event.target.selectionStart === 0  && event.code == "Space"){
   event.preventDefault();
  }
}

}
