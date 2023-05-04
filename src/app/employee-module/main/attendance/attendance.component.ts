import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../shared/emp.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {


  constructor(public empService: EmpService) {
    empService.activeComponent = 'attendance';
    empService.headerContent = '';
    this.attendance();
  }
  obj: any;
  total: any = 0;
  leave: any = 0;
  present: any = 0;
  absent: any = 0;

  today: any;
  tomorrow: any;
  in: any;
  out: any;

  attendance() {
    this.empService.attendanceload().subscribe((res: any) => {
      // current date
      const d = new Date();
      const m = d.getMonth();
      console.log(res.response);
      this.obj = res.response;
      res.response.map((d) => {
        let date = new Date(d.date);
        let month = date.getMonth();
        if (month == m) {
          if (d.status == 'present') {
            this.present = this.present + 1;
            this.total = this.total + 1
          }
          if (d.status == 'absent') {
            this.absent = this.absent + 1;
            this.total = this.total + 1
          }
          if (d.status == 'leave') {
            this.leave = this.leave + 1;
            this.total = this.total + 1
          }
        }
      })
      console.log(typeof (this.leave));
    })
    // this.total = this.leave + this.absent + this.present;
    // this.total = Number(this.total);
    // this.present=(this.present/this.total)*100;
    // this.absent=(this.absent/this.total)*100;
    // this.leave=(this.leave/this.total)*100;
    // console.log(this.total);
  }

  punchin() {
    navigator.geolocation.getCurrentPosition(this.showLoc, this.errHand);
  }

   showLoc(pos: any) {
    console.log('lat' + pos.coords.latitude, 'long' + pos.coords.longitude);

    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const lat1 = 31.2521879;
    const lon1 = 75.7033441;
    const R = 63710;
    if ((Math.acos(Math.sin(lat1) * Math.sin(lat) + Math.cos(lat1) * Math.cos(lat) * Math.cos(lon - lon1)) * R < 1000)) {

      console.log(lat);
      console.log(lon);
    }
    else {
      console.log("out of range")
      this.empService.punchin().subscribe((res: any)=>{
      })
    }
  }

  errHand(err: any) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        alert('you dont have right to mark the attendance until location is share')
        break;
    }
  }


  punchout() {

  }
  ngOnInit(): void {
    this.empService.attendanceTime().subscribe((res: any) => {
      if (res.in == '----') {
        this.in = "";
        this.out = "";
      }
      else {
        this.in = res.in;
        this.out = res.out;
      }
      console.log(res);
    })
  }


  array: any = [
    {
      id: 0,
      name: 'January',
    },
    {
      id: 1,
      name: 'February',
    },
    {
      id: 2,
      name: 'March',
    },
    {
      id: 3,
      name: 'April',
    },
    {
      id: 4,
      name: 'May',
    },
    {
      id: 5,
      name: 'June',
    },
    {
      id: 6,
      name: 'July',
    },
    {
      id: 7,
      name: 'August',
    },
    {
      id: 8,
      name: 'September',
    },
    {
      id: 9,
      name: 'October',
    },
    {
      id: 10,
      name: 'November',
    },
    {
      id: 11,
      name: 'December',
    }
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {

    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Months';
  colorvariable: number = 0;
  d = new Date();
  m: any = this.d.getMonth();

  month = this.m;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
    this.month = arr.id;
  }
  designationdropdownOption: boolean = false;

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }
}
