import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hrm_FrontEnd';
  constructor( private cookie: CookieService,private router:Router){
    var token= this.cookie.get("token");
    if(token="undefined")
    {
     this.cookie.delete("token");
     this.router.navigate(['./login']);

    }
  }


}
