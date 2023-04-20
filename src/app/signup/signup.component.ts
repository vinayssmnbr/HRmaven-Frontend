import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { matchpassword } from './custom.validator';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router'
import { Subject, } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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


    this.subject.pipe(debounceTime(3000)).subscribe(()=>{
      // this.formGroup.controls['username'].setValidators([Validators.pattern('^[A-Z]\'?[- a-zA-Z]( [a-zA-Z]*')])
      // this.formGroup.controls['username'].setValidators([Validators.pattern('^[A-Z]\'?[- a-zA-Z]( [a-zA-Z]*')])
      this.formGroup.controls['username'].setValidators([Validators.pattern('^(?! )[A-Za-z][0-9a-zA-Z]*(?<! )$')])




    })




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
    }, 8000);
  }




  constructor(public userService:UserService, private router : Router){}
  // constructor(public userService: UserService, private router: Router) { }

  noSpaces(control: FormControl) {
    if (control.value && control.value.trim().length === 0) {
      return { noSpaces: true };
    }
    return null;
  }


  sigupform = new FormGroup({
    // email : new FormControl("",[Validators.required,Validators.pattern('^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$')]),
    // email : new FormControl("",[Validators.required,Validators.pattern('^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$')]),
    email : new FormControl("",[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),

    password : new FormControl("",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/)]),
    confirm : new FormControl("",[Validators.required]),
    // username: new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z]*')]),
    username: new FormControl("",[Validators.required,Validators.pattern(/[a-zA-Z0-9\s]$/)]),


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

