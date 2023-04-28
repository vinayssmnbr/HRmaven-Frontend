import { Component, ElementRef, OnInit, Renderer2,ViewChild } from '@angular/core';
import { ActivatedRoute,Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @ViewChild('ul')
  private testElement:ElementRef;
activeLink: any;
  isAttendanceAndLeaveVisible:boolean = false;
  constructor(private router:Router,private cookie:CookieService,private renderer:Renderer2,private routes: ActivatedRoute){}

   ngOnInit(){


    this.routes.params.subscribe(params => {
      const id = params['id'];
      if (id === 'dashboard') {
        this.activeLink = 'dashboard';
      }
      // else if (id === 'employee') {
      //   this.activeLink = 'employee';
      // }
      else if (id === 'attendance') {
        this.activeLink = 'attendance';
      }
      else if (id === 'leave') {
        this.activeLink = 'leave';
      }
      else if(id==='payroll') {
        this.activeLink='payroll';
      }
      // else if(id==='leaves'){
      //   this.activeLink='leaves';
      // }
      else if(id==='recruitment'){
        this.activeLink='recruitment';
      }
      else if(id==='report'){
        this.activeLink='report';
      }
    });
  }
  goToEmployee(){
   this.router.navigate(['./employee'])
  }


  logout(){
    this.cookie.delete('token');
    this.router.navigate(['./loginemp']);

  }
  active:string='dashboard';

  access(data:any)
  {
    this.active=data;
  }

  route=['Dashboard','Employee','Attendance','Payroll','Leaves','Recruitment','Report'];


   }

