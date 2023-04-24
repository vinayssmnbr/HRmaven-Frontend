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
  expired:boolean = false;
  hasChangedPassword: boolean = false;
  errorMessage: string ='';
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







  //submission
  newpassword(data:any)
  {
    console.log(data.value);
    
    this.service.newpwd(data.value,this.token).subscribe((res:any)=>{
      // this.service.newpwd(this.forgetform.value,this.token).subscribe((res:any)=>{
      if(res=="changeit"){
        console.log(res);
        // this.hasChangedPassword = true;
      }

    });
    this.router.navigate(['./login']);
    
}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token']; // (+) converts string 'id' to a number
    });
 
    // this.service.newpwd(this.forgetform.value, this.token).subscribe({
    //   next: (res: any) => {
    //     // if (res == 'changeit') {
    //     //   this.expired = true;
          
    //     //   console.log(res);
    //     // }
    //         console.log(res);

    //     this.router.navigate(['./login']);
    //   },
        
    //   error: (err) => {
    //     if (err.status === 400 && err.error && err.error.message === 'Link has expired' 
    //     || err.error.message==='Reset password link has already been used') {
    //       this.expired = true;
    //       this.errorMessage = err.error.message;
    //     } 
    //     else  {
    //       // handle other errors
    //       // this.errorMessage = 'Link has expired!!';
    //       // this.errorMessage =  'Link has expired';
          
    //     }
    //   }
    
    // });
    this.service.newpwd(this.forgetform.value, this.token).subscribe({
      next: (res: any) => {
        // if (res == 'changeit') {
        //   this.expired = true;
        //   console.log(res);
        // }
        this.router.navigate(['./login']);
      },
      error: (err) => {
        this.handleError(err);
      }
    });
}
  handleError(err: any) {
    if (err.status === 400 && err.error && err.error.message === 'Link has expired' 
        || err.error.message === 'Reset password link has already been used') {
      this.expired = true;
      this.errorMessage = err.error.message;
    } else {
      // handle other errors
    }
   
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
