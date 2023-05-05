import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../shared/emp.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';
Chart.register(...registerables);
// import {Chart} from 'chart.js/auto';
@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent {

  oilCanvas: any = '';
  constructor(private empService: EmpService, private http: HttpClient) {
    empService.activeComponent = 'dashboard';
    empService.headerContent = '';

  }
  in: any;
  out: any;
  ipAddress: any;
  obj: any;
  donutdata: any;
  present:number = 50;
  absent :number = 25;
  leave :number = 25;
  total :number = 0;



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
    },

  ];
  contentdropdown: boolean = false;
  dropdownOpen() {

    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'January';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
    this.donutdata.map((item)=>{
      if((item.month-1)==arr.id)
      {
        this.present = item.present,
        this.total= item.total,
        this.leave = item.leave,
        this.absent = item.absent
      }
    })
  }
  ngOnInit() {
    this.obj = {
      casual: 0,
      earned: 0,
      urgent: 0,
      medical: 0
    }
    // this.present=0
    // this.absent=0;
    // this.leave=0;
    this.total=0;
    this.donut();
    this.leavegraphcontent();
    this.oilCanvas = document.getElementById("oilChart");

    let a = 50,b=20,c=30;
    const data = {
      labels: [

      ],
      datasets: [
        {
          data: [this.present,this.absent,this.leave],
          backgroundColor: [
            "#5AB452",
            "#EA6565",
            "#FBB642"

          ]
        }]
    };

    var pieChart = new Chart(this.oilCanvas, {
      type: 'doughnut',
      data: data
    });
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
    this.getIPAddress();
  }

  contentdropdown1: boolean = false;
  dropdownOpen1() {
    this.contentdropdown = !this.contentdropdown;
  }

  //  attendance // punchin
  donut() {
    this.empService.attendancedonut().subscribe((res) => {
      console.log(res);
      this.donutdata=res;
    })
  }



  ip: any;
  async punchin() {
    navigator.geolocation.getCurrentPosition(this.showLoc, this.errHand);
  }

  showLoc = async (pos: any) => {
    console.log('lat' + pos.coords.latitude, 'long' + pos.coords.longitude);

    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const lat1 = 31.2521879;
    const lon1 = 75.7033441;
    const R = 63710;
    if ((Math.acos(Math.sin(lat1) * Math.sin(lat) + Math.cos(lat1) * Math.cos(lat) * Math.cos(lon - lon1)) * R < 1000)) {

      console.log(lat);
      console.log(lon);
      if (this.ipAddress != '') {
        this.empService.punchin(this.ipAddress).
          subscribe((res: any) => {
            console.log(res.time);
            console.log(this.ipAddress);
            this.in = res.time;
          })
      }
    }
    else {
      console.log("out of range")


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
    navigator.geolocation.getCurrentPosition(this.showLocation, this.error);
  }

  showLocation = async (pos: any) => {
    console.log('lat' + pos.coords.latitude, 'long' + pos.coords.longitude);

    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const lat1 = 31.2521879;
    const lon1 = 75.7033441;
    const R = 63710;
    if ((Math.acos(Math.sin(lat1) * Math.sin(lat) + Math.cos(lat1) * Math.cos(lat) * Math.cos(lon - lon1)) * R < 1000)) {

      console.log(lat);
      console.log(lon);
      if (this.ipAddress != '') {
        this.empService.punchout(this.ipAddress).
          subscribe((res: any) => {
            console.log(res.time);
            console.log(this.ipAddress);
            this.out = res.time;
          })
      }
    }
    else {
      console.log("out of range")
    }
  }

  error(err: any) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        alert('you dont have right to mark the attendance until location is share')
        break;
    }
  }

  getIPAddress() {

    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {

      this.ipAddress = res.ip;
      console.log(this.ipAddress);

    });

  }



  async leavegraphcontent() {
    await this.empService.leavegraph().subscribe((res: any) => {
      console.log(res.response[0]);
      this.obj = res.response[0];
      console.log(this.obj);
    });
  }

}


