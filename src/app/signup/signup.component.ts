import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import { matchpassword } from './custom.validator';
import { UserService} from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

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
  password = '';


  checkPassword() {
    const input = this.password.trim();
    this.lengthCheck = input.length >= 8;
    // const lengthCheck2 = input.length <= 10;
    this. numericalCheck = (input.match(/[0-9]/i)?true:false)
    this.specialCharCheck = (input.match(/[^A-Za-z0-9-' ']/i)?true:false);
    this.spaceCheck = (input.match(' ')?true:false);
    this.capitalCheck = (input.match(/[A-Z]/)?true:false);
    this.smallCheck = (input.match(/[a-z]/)?true:false);
    //  console.log(numericalCheck,  this.specialCharCheck, spaceCheck, capitalCheck, smallCheck)
    document.getElementById('count').innerText = `Length: ${input.length}`;


  }



  toggleVisibility() {
    const input = document.getElementById('password') as HTMLInputElement;
    const see = document.getElementById('see');

    if (this.is_visible) {
      input.type = 'password';
      this.is_visible = false;
      see.style.color = 'gray';
    } else {
      input.type = 'text';
      this.is_visible = true;
      see.style.color = '#262626';
    }
  }







  ngOnInit() {
    // this.userService.isFromSignupPage = this.route.snapshot.url[0].path === 'signup';
    this.userService.isFromSignupPage = true;

    this.subject.pipe(debounceTime(3000)).subscribe(()=>{
      // this.formGroup.controls['username'].setValidators([Validators.pattern('^[A-Z]\'?[- a-zA-Z]( [a-zA-Z]*')])
      // this.formGroup.controls['username'].setValidators([Validators.pattern('^[A-Z]\'?[- a-zA-Z]( [a-zA-Z]*')])
      this.formGroup.controls['username'].setValidators([Validators.pattern('^(?! )[A-Za-z][0-9a-zA-Z]*(?<! )$')])




    })




    // let counter = 0;
    // setInterval(() => {
    //   const radioBtn = document.getElementById(`radio${counter + 1}`) as HTMLInputElement;
    //   if (radioBtn) {
    //     radioBtn.checked = true;
    //     counter++;
    //     if (counter === 4) {
    //       counter = 0;
    //     }
    //   }
    // }, 8000);
    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }




  constructor(public userService:UserService, private router : Router, private route: ActivatedRoute,private cookie: CookieService,){}

  noSpaces(control: FormControl) {
    if (control.value && control.value.trim().length === 0) {
      return { noSpaces: true };
    }
    return null;
  }


  sigupform = new FormGroup({
    // email : new FormControl("",[Validators.required,Validators.pattern('^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$')]),
    email : new FormControl("",[Validators.required,Validators.pattern('^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$')]),
    // email : new FormControl("",[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),

    password : new FormControl("",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/)]),
    // password : new FormControl("",[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/)]),
    // password : new FormControl(""),

    confirm : new FormControl("",[Validators.required]),
    // confirm : new FormControl(""),
    // username: new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z]*')]),
    username: new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z0-9. ]+$")]),


    check: new FormControl("",[Validators.required]),
  },{
    validators:matchpassword
  });



  // get password(){
  //   return this.sigupform.get('password');
  // }

  // get email(){
  //   return this.sigupform.get("email");
  // }

  // get username(){
  //   return this.sigupform.get("username");
  // }

  get fun(){
    return this.sigupform.controls;
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
  console.log("object_id:",result.user._id)
    localStorage.setItem('email', this.sigupform.controls['email'].value);
    this.cookie.set('hr_id',result.id);
    this.cookie.set('role',result.role);

  })
}
submit(){
  this.router.navigate(['/dashboard']) //your router URL need to pass it here
}

SignupByGoogle() {
  console.log('google');
  window.location.href = 'https://hrmaven.works/auth/google';
}


onKeyUp(event): void {
  event.target.value = event.target.value.trim()

}
  // event.target.value.replace(/[^A-Za-z0-9-,.;'&/.() ]|^ /g,'').trim()


onKeyDown(): void {
  // When the user starts to type, remove the validator
  this.formGroup.controls['username'].clearValidators();
}

Space(event:any){
   if(event.target.selectionStart === 0  && event.code == "Space"){
    event.preventDefault();
   }
}



}

