import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router : Router) { }

  isLoggedIn=new BehaviorSubject<boolean>(false)


  saveurl="http://localhost:3000/signup"
  loginurl="http://localhost:3000/login"
  Forgoturl="http://localhost:3000/forgotpassword"
  Reseturl="http://localhost:3000/resetpassword"

  users(data: any){

    this.isLoggedIn.next(true);

    return this.http.post(this.loginurl,data)
  }

  saveUser(data: any){
    this.isLoggedIn.next(true);
    return this.http.post(this.saveurl,data)

  }

  ForgotEmail(data:any)
  {
    return this.http.post(this.Forgoturl,data);
  }

  newpwd(data:any,token:any){
      let headers= new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token':token,
        Accept:'application/json'
      })

      return this.http.post(this.Reseturl,data, { headers });

    }

  }

