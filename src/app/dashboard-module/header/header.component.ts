import { Component, ElementRef } from '@angular/core';
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
  showSearchBox = false;
  date: any;
  greeting: any;
  employee: string;
  loggedInName: any = '';
  userEmail: any = '';
  name: any = '';
  profileDisplay: boolean = false;
  getUsersProfile: any = [];
  showNotifications = true;
  profileDisplayNot: boolean;
  hideNotifications = false;

  constructor(
    public dashService: DashService,
    private userService: UserService,
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.getProfileData();
  }
  hide: boolean = true;

  ngOnInit() {
    const today = new Date();
    this.date = today.toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const currentHour = today.getHours();
    if (currentHour < 12) {
      this.greeting = 'GOOD MORNING';
    } else if (currentHour < 18) {
      this.greeting = 'GOOD AFTERNOON';
    } else {
      this.greeting = 'GOOD EVENING';
    }

    this.elementRef.nativeElement.addEventListener('mouseleave', () => {
      this.profileDisplay = false;
    });
    this.elementRef.nativeElement.addEventListener('mouseleave', () => {
      this.visible = false;
    });
  }

  toggleSearchBox() {
    this.showSearchBox = !this.showSearchBox;
  }

  getProfileData() {
    this.dashService.getUserProfile().subscribe((res: any) => {
      this.userEmail = res.email.split('@')[0];
      this.name = res.username.charAt(0).toUpperCase() + res.username.slice(1);
    });
  }

  profileToggle() {
    if (this.hideNotifications) {
      this.visible = false;
    } else if (!this.hideNotifications) {
      this.visible = false;
    }
    this.hideNotifications = true;

    this.profileDisplay = !this.profileDisplay;
  }

  logout() {
    this.cookie.delete('token');
    this.router.navigate(['./login']);
  }

  ReadMore: boolean = true;
  visible: boolean = false;
  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible;
      if(!this.hideNotifications){
      this.profileDisplay= false
    }
  }
  id: any = 'all';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }
}
