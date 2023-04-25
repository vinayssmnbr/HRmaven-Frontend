import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
import { DashService } from '../../shared/dash.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-attendance-content',
  templateUrl: './attendance-content.component.html',
  styleUrls: ['./attendance-content.component.css'],
})
export class AttendanceContentComponent implements OnInit {
  designationdropdownOption: boolean = false;
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
  employee: any = [];
  employee1: any = [];
  showModal = false;
  showCard: boolean = false;
  employeeid = '';
  employeename = '';
  lineChart: Chart;
  selectedUser: any = {};
  leaves: any[] = [];
  data: any;
  update = false;
  editmodal = false;
  showCard1: boolean = true;
  showTable = true;
  attDate: any = "";
  loader = true;
  datez: any = "";
  table1Visible = false;
  table2Visible = false;
  todayDate: string;
  totalDays: number;

  DayAttendance = [];

  constructor(public dashService: DashService, private datepipe: DatePipe) {
    dashService.activeComponent = 'attendance';
    dashService.headerContent = '';
    this.getLeaveData()
    this.getreport()
    this.datez = this.datepipe.transform(new Date(), 'YYYY-MM-dd');
    console.log(this.datez);
    this.dayWiseAttendance(this.datez);
  }


  dayWiseAttendance(date:any){
  this.dashService.getAttendance(date).subscribe((res: any) => {
    // console.log('data', res); // add this line
    this.DayAttendance = res;

  });
}
changefunction()
{
  this.dayWiseAttendance(this.datez);
}



  form = new FormGroup({
    name: new FormControl(),
    empId: new FormControl(),
    date: new FormControl(''),
    status: new FormControl(''),
    punch_in: new FormControl(''),
    punch_out: new FormControl(''),
  });



  async getreport() {
    await this.dashService.graphcontent().subscribe((res: any) => {
      console.log(res);
      const present=[0,0,0,0,0,0,0,0,0,0,0,0];
      const absent=[0,0,0,0,0,0,0,0,0,0,0,0];
      const leave=[0,0,0,0,0,0,0,0,0,0,0,0];
      res.map((d)=>{
        present[d.month]=d.present;
        absent[d.month]=d.absent;
        leave[d.month]=d.leave;
      })
      const myChart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'Present',
              data: present,
              backgroundColor: ['#2D11FA'],
              pointStyle: 'circle',
            },
            {
              label: 'Absent',
              data: absent,
              backgroundColor: ['#FDA75A'],
              pointStyle: 'circle',
            },
            {
              label: 'Leaves',
              data: leave,
              backgroundColor: ['#00C9FF'],
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
                  size: 10,
                },
              },
            },
          },
        },
      });

      if (res) {
        setTimeout(() => {
          this.loader = false;
        }, 3000);
      }
     });
  }

  ngOnInit() {
    this.form.get('name').disable();
    this.form.get('empId').disable();
    // this.form.get('punch_in').disable();
    // this.form.get('punch_out').disable();
    window.scrollTo(0, 0);
    // Create a chart object
    const today = new Date();
    this.datez = today.toISOString().slice(0, 10);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    this.totalDays = new Date(year, month, 0).getDate();
    // this.dashService.getAttendance().subscribe((data: any[]) => {
    //   const presentDays = data.filter((record) => record.status === 'present').length;
    //   const totalDays = new Date(year, month, 0).getDate();
    //   const attendancePercentage = (presentDays / totalDays) * 100;

    //   // Use attendancePercentage to update your UI
    // });
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
  //GET LEAVE DATA
  getLeaveData() {
    this.dashService.getleaves().subscribe((res: any) => {
      // console.log('data', res);
      this.employee1 = res;
    });
  }


  toggleTable1() {
    this.showCard = !this.showCard;
    this.showTable = !this.showTable;
    this.table1Visible = !this.table1Visible;
    this.table2Visible = false; // ensure other table is hidden

  }

  async toggleTable2() {
    this.showCard = !this.showCard;
    this.showTable = !this.showTable;
    this.table2Visible = !this.table2Visible;
    this.table1Visible = false;
  }

  // edit(){
  //   this.closeModal();
  // this.editmodal=!this.editmodal;
  // }
  // done(){
  //   this.editmodal=!this.editmodal;
  // }


  // array: any = [
  //   {
  //     id: 0,
  //     name: 'present',
  //   },
  //   {
  //     id: 1,
  //     name: 'absent',
  //   },
  //   {
  //     id: 2,
  //     name: 'leave',
  //   },

  // ];
  // contentdropdown: boolean = false;
  // dropdownOpen() {

  //   this.contentdropdown = !this.contentdropdown;
  // }
  // Selectvariable: string ="select";
  // colorvariable: number =  0;
  // Changeselect(arr: any) {
  //   this.Selectvariable = arr.name;
  //   this.colorvariable = arr.id;
  //   this.contentdropdown=false;
  //   console.log(arr.name);
  // }
  // dropdownOpenOption() {
  //   this.designationdropdownOption = !this.designationdropdownOption;
  // }

}
function getCurrentDate() {
  throw new Error('Function not implemented.');
}

