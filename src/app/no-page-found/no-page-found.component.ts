import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.css']
})
export class NoPageFoundComponent {
  constructor(private location: Location,private cookie: CookieService,private router:Router){}
 goback(){
    if(this.cookie.get('role')=='hr')
    {
        this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/emp-dashboard']);
    }
 }

}
