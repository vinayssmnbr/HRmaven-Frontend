import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
import { DashService } from '../../shared/dash.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css'],
})
export class DashboardContentComponent implements OnInit {
  loader=false;

  constructor(
    public dashService: DashService,private http:HttpClient,
    @Inject(DOCUMENT) public document: Document,private elementRef: ElementRef
  ) {
    dashService.activeComponent = 'dashboard';
    dashService.headerContent = '';

    this.dashService.getLeaves().subscribe((res: any) => {
      console.log('data', res);
      this.leaves = res;
      this.leaves = this.leaves.sort((a, b) => {
        if (a.status > b.status) return 1;
        if (a.status < b.status) return -1;
        return 1;
      })
      console.log(this.leaves)

    });

    this.showchart()

  }
  options: any = [
    {
      day: 'Mon',
      Date: '21',
      head: 'Interview',
      time: '10am to 12pm',
    },
    {
      day: 'Mon',
      Date: '21',
      head: 'Interview',
      time: '10am to 12pm',
    },
    {
      day: 'Mon',
      Date: '21',
      head: 'Interview',
      time: '10am to 12pm',
    },
    {
      day: 'Mon',
      Date: '10',
      head: 'Interview',
      time: '10am to 12pm',
    },
    {
      day: 'Mon',
      Date: '10',
      head: 'Interview',
      time: '10am to 12pm',
    },
    {
      day: 'Mon',
      Date: '10',
      head: 'Interview',
      time: '10am to 12pm',
    },
    {
      day: 'Mon',
      Date: '10',
      head: 'Interview',
      time: '10am to 12pm',
    },
    {
      day: 'Mon',
      Date: '10',
      head: 'Interview',
      time: '10am to 12pm',
    },
    {
      day: 'Mon',
      Date: '10',
      head: 'Interview',
      time: '10am to 12pm',
    },

  ];

  Edit(index: any) {
    console.log(index);
  }



  ToggleMenu(index: any) {
    var ul = document.getElementById(index);
    ul.classList.toggle('close');
    ul.addEventListener('mouseleave',()=>{
      ul.classList.add('close');
    })
  }

  leaves: any[] = [


  ]
  ngOnInit()
   {


    this.dashService.getreport().subscribe((res:any)=>{
    if(res)
    {
      console.log('yeah');
      this.loader=true;
    }
    let chart = this.elementRef.nativeElement.querySelector(`#myChart`);

    const myChart = new Chart(chart, {
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
            borderColor: [
              // 'rgba(255, 99, 132, 1)',
              // 'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
              // 'rgba(255, 99, 132, 1)'
            ],
            // borderWidth: 1
          },
          {
            label: 'Absent',
            data:res.absent,
            backgroundColor: ['#FDA75A'],
            pointStyle: 'circle',
            borderColor: [
              // 'rgba(255, 99, 132, 1)',
              // 'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
              // 'rgba(255, 99, 132, 1)'
            ],
            // borderWidth: 1
          },
          {
            label: 'Leaves',
            data: res.leave,
            backgroundColor: ['#00C9FF'],
            pointStyle: 'circle',
            borderColor: [
              // 'rgba(255, 99, 132, 1)',
              // 'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
              // 'rgba(255, 99, 132, 1)'
            ],
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
              labels: {
                padding: 40,
                usePointStyle: true,
                font: {
                  size: 10
                }
              }
          }
      }
      },
    });


  });

    // Create a chart object
  }


  showchart(){

  }



array: any = [
  {
    id: 0,
    name: 'Weekly',
  },
  {
    id: 1,
    name: 'Monthly',
  },
  {
    id: 2,
    name: 'Yearly',
  },

];
contentdropdown: boolean = false;
dropdownOpen() {

  this.contentdropdown = !this.contentdropdown;
}
Selectvariable: string = 'Monthly';
colorvariable: number =  0;
Changeselect(arr: any) {
  this.Selectvariable = arr.name;
  this.colorvariable = arr.id;
  this.contentdropdown=false;
  console.log(arr.name);
}

updateLeaveStatus(object: any, status: 'accept' | 'reject') {
  this.dashService.updateleave(object,status);
}

}

