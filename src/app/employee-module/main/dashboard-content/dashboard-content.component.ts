import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../shared/emp.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/service/employee.service';
Chart.register(...registerables);
// import {Chart} from 'chart.js/auto';
@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent {

  oilCanvas: any = '';
  constructor(public  empService: EmpService, private http: HttpClient,public login : EmployeeService) {
    empService.activeComponent = 'dashboard';
    empService.headerContent = '';

  }
  in: any;
  out: any;
  ipAddress: any;
  obj: any;
  donutdata: any;
  present: number = 0;
  absent: number = 0;
  leave: number = 0;
  total: number = 0;
  done_punch_in:boolean=false;
  done_punch_out:boolean=false;
  loaderz:boolean=false;



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
    this.donutdata.map((item) => {
      if ((item.month - 1) == arr.id) {
        this.present = item.present,
          this.total = item.total,
          this.leave = item.leave,
          this.absent = item.absent
        this.blank = false;
        if(this.total!=0 && this.leave==0 && this.absent==0 && this.present==0)
        {
          this.blank=true;
        }
      }
      else {
        this.present = this.absent = this.leave = 0;
        this.total = 0;
        this.blank = true;
      }
    })

    this.pieChart.destroy();
    this.piechart();
  }
  ngOnInit() {
    this.obj = {
      casual: 0,
      compensatory: 0,
      medical: 0
    }

    // this.present=0
    // this.absent=0;
    // this.leave=0;
    this.total = 0;
    this.donut();
    this.leavegraphcontent();
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
      this.donutdata = res;
      this.loaderz=false;
      this.aa();
    })

  }

  aa(){
    const d = new Date();
    const month = d.getMonth() + 1;
    this.Selectvariable = this.array[d.getMonth()].name;
    this.donutdata.map((item: any) => {
      if ((item.month) == month) {
        this.present = item.present,
          this.total = item.total,
          this.leave = item.leave,
          this.absent = item.absent
        this.blank = false;
        if(this.total!=0 && this.leave==0 && this.absent==0 && this.present==0)
        {
          this.blank=true;
        }
      }
      else {
        this.present = this.absent = this.leave = 0;
        this.total = 0;
        this.blank = true;
      }
    })
    this.piechart()
  }



  ip: any;
  async punchin() {
    navigator.geolocation.getCurrentPosition(this.showLoc, this.errHand);
  }

  showLoc = async (pos: any) => {
    console.log('lat' + pos.coords.latitude, 'long' + pos.coords.longitude);

    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const lat1 = 31.279581;
    const lon1 = 75.782387;
    // const lat1=31.280317;
    // const lon1=75.575594;
    const R = 63710;
    if ((Math.acos(Math.sin(lat1) * Math.sin(lat) + Math.cos(lat1) * Math.cos(lat) * Math.cos(lon - lon1)) * R < 1000)) {

      console.log(lat);
      console.log(lon);
      if (this.ipAddress != '') {
        this.empService.punchin(this.ipAddress).
          subscribe((res: any) => {
            console.log(res.time);
            console.log(this.ipAddress);
            this.in = new Date();
            this.done_punch_in=true;
          })
      }
    }
    else {
      console.log("out of range")
      alert('out of range');


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
    const lat1 = 31.279581;
    const lon1 = 75.782387;
    // const lat1=31.280317;
    // const lon1=75.575594;
    const R = 63710;
    if ((Math.acos(Math.sin(lat1) * Math.sin(lat) + Math.cos(lat1) * Math.cos(lat) * Math.cos(lon - lon1)) * R < 1000)) {

      console.log(lat);
      console.log(lon);
      if (this.ipAddress != '') {
        this.empService.punchout(this.ipAddress).
          subscribe((res: any) => {
            console.log(res.time);
            console.log(this.ipAddress);
            this.out = new Date();
            this.done_punch_out=true;

          })
      }
    }
    else {
      console.log("out of range")
      alert('out of range');
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

  showModal = false;
  showModalContent = false;
  closeModal() {
    this.showModal = false;
    this.showModalContent = false;
  }

  openModal() {
    this.showModal = true;
    this.showModalContent = true;
  }

  ngAfterViewInit() {
    this.oilCanvas = document.getElementById("oilChart");
    this.loaderz = false;

  }
  blank: boolean = false;
  pieChart: any;
  piechart = () => {


    const data = {
      labels: [

      ],
      datasets: [
        {
          data: [this.present, this.absent, this.leave],
          backgroundColor: [
            "#5AB452",
            "#EA6565",
            "#FBB642"
          ]
        }]
    };

    this.pieChart = new Chart(this.oilCanvas, {
      type: 'doughnut',
      data: data
    });
  }


}


