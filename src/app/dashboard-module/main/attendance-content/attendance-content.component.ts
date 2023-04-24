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
  attDate: any = '';
  loader = true;
  datez: any = '';
  table1Visible = false;
  table2Visible = false;
  todayDate: string;
  totalDays: number;
  constructor(public dashService: DashService, private datepipe: DatePipe) {
    dashService.activeComponent = 'attendance';
    dashService.headerContent = '';
    this.dashService.getAttendance().subscribe((res: any) => {
      // console.log('data', res); // add this line
      this.employee = res;
      console.log(this.employee);
    });
    this.getLeaveData();
    this.getreport();
    this.datez = this.datepipe.transform(new Date(), 'dd-MM-YYYY');
    console.log(this.datez);
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
    await this.dashService.getreport().subscribe((res: any) => {
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
              data: res.present,
              backgroundColor: ['#2D11FA'],
              pointStyle: 'circle',
            },
            {
              label: 'Absent',
              data: res.absent,
              backgroundColor: ['#FDA75A'],
              pointStyle: 'circle',
            },
            {
              label: 'Leaves',
              data: res.leave,
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
    this.dashService.getAttendance().subscribe((data: any[]) => {
      const presentDays = data.filter(
        (record) => record.status === 'present'
      ).length;
      const totalDays = new Date(year, month, 0).getDate();
      const attendancePercentage = (presentDays / totalDays) * 100;
      // Use attendancePercentage to update your UI
    });

    // ----------------------------Custom Circular Progress Bar-----------------------


    // const progressBar = document.querySelector(
    //   '.circular-progress'
    // ) as HTMLElement;
    // const valueContainer = document.querySelector(
    //   '.value-container'
    // ) as HTMLElement;

    // let progressValue = 0;
    // const progressEndValue = 50;
    // const speed = 50;

    // const progress = setInterval(() => {
    //   progressValue++;
    //   valueContainer.textContent = `${progressValue}%`;

    //   progressBar.style.background = `conic-gradient(
    //     #4d5bf9 ${progressValue * 3.6}deg,
    //     #D9D9D9 ${progressValue * 3.6}deg
    //   )`;

    //   if (progressValue === progressEndValue) {
    //     clearInterval(progress);
    //   }
    // }, speed);




    
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
  // openModal(user:any) {

  //   this.form.patchValue(user);
  //   this.form.setValue({
  //     name:user.name,
  //     empId:user.empId,
  //     date:user.date,
  //     status:user.status,
  //     punch_in:user.punch_in,
  //     punch_out:user.punch_out,
  //   });
  //   this.Selectvariable=user.status;
  //   this.showModal = true;
  //   this.selectedUser = {_id: user._id};
  // }

  //GET LEAVE DATA
  getLeaveData() {
    this.dashService.getleaves().subscribe((res: any) => {
      // console.log('data', res);
      this.employee1 = res;
    });
  }
  //   OnUpdate(){
  //     console.log(this.form.value)
  //     const updatedData = this.form.value;
  //     updatedData['_id'] = this.selectedUser._id;
  //     this.dashService.updateEmpAttendance(updatedData).subscribe(() => {
  //       console.log('Data updated successfully');
  //     this.getLeaveData()
  // this.edit();
  //     });
  //   }

  // closeModal() {
  //   this.showModal = !this.showModal;
  // }
  calender = true;
  toggleTable1() {
    this.showCard = !this.showCard;
    this.showTable = !this.showTable;
    this.table1Visible = !this.table1Visible;
    this.table2Visible = false; // ensure other table is hidden
    this.calender = true;
    this.dropdown = false;
  }
  dropdown = false;
  async toggleTable2() {
    this.dropdown = true;
    this.calender = false;
    this.showCard = !this.showCard;
    this.showTable = !this.showTable;
    this.table2Visible = !this.table2Visible;
    this.table1Visible = false;
    await this.dashService.getAttendance().subscribe((res: any) => {
      // console.log('data', res); // add this line
      this.employee1 = res;
      console.log(this.employee1);
    }); // ensure other table is hidden
  }

  // ---------------------Drop Down--------------------------------
  array: any = [
    {
      id: 0,
      name: 'Software Developer',
    },
    {
      id: 1,
      name: 'Frontend Developer',
    },
    {
      id: 3,
      name: 'Full Stack Developer',
    },
    {
      id: 4,
      name: 'UI/UX Designer',
    },
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Designation';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
  }
}
function getCurrentDate() {
  throw new Error('Function not implemented.');
}
