import { Component,OnInit } from '@angular/core';
import { Route,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
constructor(private router:Router,private cookie:CookieService){}

ngOnInit() {

}
goToEmployee(){
 this.router.navigate(['./dashboard/employee'])
}


logout(){
  this.cookie.delete('token');
  this.router.navigate(['./login']);

}

}
