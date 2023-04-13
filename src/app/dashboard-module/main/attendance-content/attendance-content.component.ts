import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-attendance-content',
  templateUrl: './attendance-content.component.html',
  styleUrls: ['./attendance-content.component.css'],
})
export class AttendanceContentComponent implements OnInit {
  circularProgress: any;
  progressValue: any;
  progressStartValue = 0;
  progressEndValue = 50;
  speed = 100;
  progressInterval: any;
    buttonbackgroundColor = '#2F2C9F';
  buttonColor = '#FFFFFF';
  buttonbackgroundColor2 = '#ECECEC';
  buttonColor2 = '#2F2C9F';
  buttonbackgroundColor3 = '#2F2C9F';
  buttonColor3 = '#FFFFFF';
  employee: any= [];
  showModal=false;
  showCard: boolean = true;
  employeeid="";
  employeename="";
  update:boolean=false;


  constructor(private http: HttpClient,public dashService: DashService) {
    // this.fetchdata();
    dashService.activeComponent = 'attendance';
    dashService.headerContent = '';
     this.dashService.getAttendance().subscribe((res: any) => { // console.log('data', res);
      this.employee = res;
    });
    this.getreport();
  }

  async getreport(){
   await this.dashService.getreport().subscribe((res:any)=>{
      console.log(res);
    const myChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
        datasets: [
          {
            label: 'Present',
            data:res.present,
            backgroundColor: ['blue'],
            borderColor: ['blue'],
            borderWidth: 1,
            pointStyle: 'circle',
          },
          {
            label: 'Absent',
            data:res.absent,
            backgroundColor: ['#FDA75A'],
            borderColor: ['#FDA75A'],
            borderWidth: 1,
            pointStyle: 'circle',
          },
          {
            label: 'Leaves',
            data:res.leave,
            backgroundColor: ['#00C9FF'],
            borderColor: ['#00C9FF'],
            borderWidth: 1,
            pointStyle: 'circle',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 40,
              usePointStyle: true,
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
    });
  }

   ngOnInit() {
  }


  changeColor() {
    this.buttonbackgroundColor =
      this.buttonbackgroundColor === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
    this.buttonColor = this.buttonColor === '#FFFFFF' ? '#2F2C9F' : '#FFFFFF';
  }
  changeColor2() {
    this.buttonbackgroundColor2 =
      this.buttonbackgroundColor2 === '#ECECEC' ? '#2F2C9F' : '#ECECEC';
    this.buttonColor2 = this.buttonColor2 === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
  }
  changeColor3() {
    this.buttonbackgroundColor3 =
      this.buttonbackgroundColor3 === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
    this.buttonColor3 = this.buttonColor3 === '#FFFFFF' ? '#2F2C9F' : '#FFFFFF';
  }
  openModal() {
    console.log("hit");
    this.update = !this.update;
    console.log(this.update);
  }
  closeModal() {
    this.showModal = !this.showModal;
  }

  toggleTable1() {
    this.showCard = !this.showCard;
  }
 }
