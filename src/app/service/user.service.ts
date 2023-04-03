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

  users(data: any){

    this.isLoggedIn.next(true);

    return this.http.post(this.loginurl,data)
  }

  saveUser(data: any){
    this.isLoggedIn.next(true);
    return this.http.post(this.saveurl,data)

  }



}
