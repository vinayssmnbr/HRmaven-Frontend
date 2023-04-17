import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
import { DashService } from '../../shared/dash.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

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
  employee: any = [];
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

  constructor(public dashService: DashService) {
    dashService.activeComponent = 'attendance';
    dashService.headerContent = '';
    this.dashService.getAttendance().subscribe((res: any) => {
      console.log('data', res); // add this line
      this.employee = res;
    });
    this.getLeaveData()
    this.getreport();
  }

  form = new FormGroup({
    name: new FormControl(),
    empId: new FormControl(),
    date: new FormControl(''),
    status: new FormControl(''),
    punch_in: new FormControl(''),
    punch_out: new FormControl(''),
  });



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
                 size: 10,
               },
             },
           },
         },
       },
     });
     if(res){
     setTimeout(() => {
      this.loader=false;
    }, 3000);
  }
     });
   }
  ngOnInit() {
    this.form.get('name').disable();
    this.form.get('empId').disable();
    window.scrollTo(0, 0);
    // Create a chart object

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
  openModal(user:any) {
    this.showModal = true;
    this.selectedUser = {_id: user._id};
    this.form.patchValue(user)
  }


//GET LEAVE DATA
getLeaveData(){
this.dashService.getleaves().subscribe((res: any) => {
  console.log('data', res);
  this.employee = res;
});
}
  OnUpdate(){
    console.log(this.form.value)
    const updatedData = this.form.value;
    updatedData['_id'] = this.selectedUser._id;
    this.dashService.updateEmpAttendance(updatedData).subscribe(() => {
      console.log('Data updated successfully');
    this.getLeaveData()
this.edit();
    });
  }

  closeModal() {
    this.showModal = !this.showModal;
  }

  toggleTable1() {
    this.showCard = !this.showCard;
    this.showTable=!this.showTable;
    this.table1Visible = !this.table1Visible;
    this.table2Visible = false; // ensure other table is hidden

  }

  toggleTable2(){
    this.showCard=!this.showCard;
    this.showTable=!this.showTable;
    this.table2Visible = !this.table2Visible;
    this.table1Visible = false; // ensure other table is hidden
  }

edit(){
  this.closeModal();
this.editmodal=!this.editmodal;
}
done(){
  this.editmodal=!this.editmodal;
}


array: any = [
  {
    id: 0,
    name: 'present',
  },
  {
    id: 1,
    name: 'absent',
  },
  {
    id: 2,
    name: 'leave',
  },

];
contentdropdown: boolean = false;
dropdownOpen() {

  this.contentdropdown = !this.contentdropdown;
}
Selectvariable: string ="select";
colorvariable: number =  0;
Changeselect(arr: any) {
  this.Selectvariable = arr.name;
  this.colorvariable = arr.id;
  this.contentdropdown=false;
  console.log(arr.name);
}
}
