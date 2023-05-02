import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
import { DashService } from '../../shared/dash.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attendance-content',
  templateUrl: './attendance-content.component.html',
  styleUrls: ['./attendance-content.component.css'],
})
export class AttendanceContentComponent implements OnInit {
  designationdropdownOption: boolean = false;
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
  percentage = 10;
  leaves: any[] = [];
  data: any;
  update = false;
  editmodal = false;
  showCard1: boolean = true;
  showTable = true;
  attDate: any = '';
  loader = true;
  datez: any = '';
  table1Visible = false;
  table2Visible = true;
  todayDate: string;
  totalDays: number;
  DayAttendance = [];
  card: any = [];
  constructor(
    public dashService: DashService,
    private datepipe: DatePipe,
    private http: HttpClient
  ) {
    dashService.activeComponent = 'attendance';
    dashService.headerContent = '';
    this.getLeaveData();
    this.getreport();
    this.datez = this.datepipe.transform(new Date(), 'YYYY-MM-dd');
    console.log(this.datez);
    this.dayWiseAttendance(this.datez);
  }

  dayWiseAttendance(date: any) {
    this.dashService.getAttendance(date).subscribe((res: any) => {
      // console.log('data', res); // add this line
      this.DayAttendance = res;
    });
  }
  changefunction() {
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
      const present = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const absent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const leave = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      res.map((d) => {
        present[d.month] = d.present;
        absent[d.month] = d.absent;
        leave[d.month] = d.leave;
      });
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
            {
              label: 'short leave',
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

    //------------ Progress Bar Girija----------
    const max = -219.99078369140625;
    const progressElements = document.querySelectorAll('.progress');
    progressElements.forEach((value, index) => {
      const percent = parseFloat(value.getAttribute('data-progress'));
      value
        .querySelector('.fill')
        .setAttribute(
          'style',
          `stroke-dashoffset: ${((100 - percent) / 100) * max}`
        );
    });
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

  calender = true;
  toggleTable1() {
    this.showCard = true;
    this.showTable = false;
    this.table1Visible = !this.table1Visible;
    this.table2Visible = false; // ensure other table is hidden
    this.calender = false;
    this.dropdown = true;
    const d = new Date();
    const month = d.getMonth();
    this.Selectvariable = this.array[month].name;
    this.loadcarddata(month);
  }
  dropdown = false;
  async toggleTable2() {
    this.dropdown = false;
    this.calender = true;
    this.showCard = false;
    this.showTable = true;
    this.table2Visible = !this.table2Visible;
    this.table1Visible = false;
  }

  // ---------------------Drop Down--------------------------------
  array: any = [
    {
      id: 0,
      name: 'January ',
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
      name: 'November ',
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
  Selectvariable: string = 'Months';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.id);
    this.loadcarddata(arr.id);
  }

  loadcarddata(month: any) {
    this.dashService.getAttendancecard(month).subscribe((res) => {
      console.log(res);
      this.card = res;
    });
  }

  dropdownOpenOption() {
    this.designationdropdownOption = !this.designationdropdownOption;
  }
  // ----------------Profile table Girija----------------
  profilecard = false;
  attendence_main = true;
  profileview() {
    this.profilecard = true;
    this.attendence_main = false;
  }
  back_profile() {
    this.profilecard = false;
    this.attendence_main = true;
  }

  getEmployeeData() {
    this.dashService.getEmployee().subscribe((res) => {
      this.employee = res;
    });
  }
}
