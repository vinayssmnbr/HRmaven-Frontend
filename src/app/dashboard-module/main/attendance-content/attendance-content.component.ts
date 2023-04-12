import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart, registerables } from 'chart.js';
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
  showCard: boolean = true;
  employeeid="";
  employeename="";
  lineChart: Chart;
  selectedUser:any={};
leaves:any[]=[]
 data: any;
 update: boolean = false;
  editmodal=false;




  constructor(public dashService: DashService) {
    // this.fetchdata();
    dashService.activeComponent = 'attendance';
    dashService.headerContent = '';
    //GET EMPLOYEE DATA
     const data=this.dashService.getEmployee().subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;

    });
    this.getLeaveData()
  }
  form = new FormGroup({
    name:new FormControl('{disabled: true}'),
    empId:new FormControl('{disabled: true}'),
    date: new FormControl(''),
    status: new FormControl(''),
    punch_in: new FormControl(''),
    punch_out: new FormControl(''),


  });
  ngOnInit() {

    // Create a chart object
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
            data: [
              50, 280, 370, 250, 80, 60, 50, 40, 70, 30, 20, 40,
            ],
            backgroundColor: ['green'],
            borderColor: ['green'],
            borderWidth: 1,
            pointStyle: 'circle',
          },
          {
            label: 'Absent',
            data: [
              230, 50, 150, 350, 320, 250, 70, 350, 100, 50, 300, 40,

            ],
            backgroundColor: ['red'],
            borderColor: ['red'],
            borderWidth: 1,
            pointStyle: 'circle',
          },
          {
            label: 'Leaves',
            data: [
              250, 300, 230, 340, 250, 50, 200, 300, 150, 200, 70, 40,
            ],
            backgroundColor: ['yellow'],
            borderColor: ['yellow'],
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
  }

  updateChart() {
    const presentData = [];
    const absentData = [];
    const leavesData = [];
    const labels = [];

    this.employee.forEach((emp) => {
      presentData.push(emp.present);
      absentData.push(emp.absent);
      leavesData.push(emp.leaves);
      labels.push(emp.month);
    });

    this.lineChart.data.datasets[0].data = presentData;
    this.lineChart.data.datasets[1].data = absentData;
    this.lineChart.data.datasets[2].data = leavesData;
    this.lineChart.data.labels = labels;
    this.lineChart.options.scales['y'].ticks.callback = (value: any) => {
      return labels[value];
    };
    this.lineChart.update();
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
    this.dashService.updateEmployee(updatedData).subscribe(() => {
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
  }

edit(){
  this.closeModal();
this.editmodal=!this.editmodal;
}
done(){
  this.editmodal=!this.editmodal;
}


}
