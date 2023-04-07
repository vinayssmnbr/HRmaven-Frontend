import { Component } from '@angular/core';
import { DashService } from '../shared/dash.service';
import { UserService } from '../../service/user.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showSearchBox=false;
  date: any;
  greeting: any;
  employee:string
  loggedInName: any ='';

  getUsersProfile: any =[];

  constructor(public dashService:DashService, private userService : UserService,
     private http:HttpClient, private cookie:CookieService,
     private router:Router ) {}

  ngOnInit() {
    const today = new Date();
    this.date = today.toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const currentHour = today.getHours();
    if (currentHour < 12) {
      this.greeting = "GOOD MORNING";
    } else if (currentHour < 18) {
      this.greeting = "GOOD AFTERNOON";
    } else {
      this.greeting = "GOOD EVENING";
    }


  }
  toggleSearchBox(){
    this.showSearchBox=!this.showSearchBox;
  }
  userEmail: any = '';
  name: any ='';

  profileDisplay: boolean = false;

    //  My code for profile fetch Name
  getProfileData(){
    this.userService.getUserProfile().subscribe(
      (response) => {
        // console.log("header response: ", response._id, response.username, response.email);
        
        this.userEmail = response.email;
        this.name = response.username;

        // console.log("email: ", this.userEmail);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  profileToggle(){
    this.profileDisplay = !this.profileDisplay
  }

  logout(){
    this.cookie.delete('token');
    this.router.navigate(['']);
  
  }
 





}
