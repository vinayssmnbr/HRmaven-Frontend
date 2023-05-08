import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('ul')
  private testElement: ElementRef;

  constructor(
    private router: Router,
    private cookie: CookieService,
    private renderer: Renderer2,
    private routes: ActivatedRoute
  ) {}
  activeLink: any;
  isAttendanceAndLeaveVisible: boolean = false;

  ngOnInit() {
    console.log('abcd');
    if (this.router.url == '/attendance' || this.router.url == '/leaves') {
      this.isAttendanceAndLeaveVisible = true;
    }
    this.routes.params.subscribe((params) => {
      console.log(params);
      console.log('params');

      const id = params['id'];
      if (id === 'dashboard') {
        this.activeLink = 'dashboard';
      } else if (id === 'employee') {
        this.activeLink = 'employee';
      } else if (id === 'attendance') {
        this.activeLink = 'attendance';
      } else if (id === 'payroll') {
        this.activeLink = 'payroll';
      } else if (id === 'leaves') {
        this.activeLink = 'leaves';
      } else if (id === 'recruitment') {
        this.activeLink = 'recruitment';
      } else if (id === 'report') {
        this.activeLink = 'report';
      }
    });
    //  --------------------Drop Down form-------------
    const optionMenu = document.querySelector<HTMLElement>('.Timesheet')!,
      selectBtn = optionMenu.querySelector<HTMLElement>('.select-btn')!;
    selectBtn.addEventListener('click', () =>
      optionMenu.classList.toggle('active')
    );
  }

  goToUrl(link: string) {
    this.router.navigate([link]);
  }
  goToEmployee() {
    this.router.navigate(['./employee']);
  }

  logout() {
    this.cookie.delete('token');
    this.cookie.deleteAll();
    localStorage.removeItem('empname');
    // localStorage.removeItem('emailid');
    // localStorage.removeItem('organisationn')
    localStorage.removeItem('companyname')
    // localStorage.removeItem('password');
    this.router.navigate(['./login']);
    // window.open('http://localhost:4200/login');

  }
  active: string = 'dashboard';

  access(data: any) {
    this.active = data;
  }

  route = [
    'Dashboard',
    'Employee',
    'Attendance',
    'Payroll',
    'Leaves',
    'Recruitment',
    'Report',
  ];

}

