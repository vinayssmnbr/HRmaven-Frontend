import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  user: any;
constructor(private http:HttpClient,
  private cookie:CookieService,
  private router: Router,

  ){}

ngOnInit(){

}

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['/login']);

  }
}
