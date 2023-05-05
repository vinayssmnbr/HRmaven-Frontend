import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../shared/emp.service';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
// import {Chart} from 'chart.js/auto';
@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent {
  
  oilCanvas: any = '';
  constructor(private empService: EmpService) {
    empService.activeComponent = 'dashboard';
    empService.headerContent = '';

  }
  in: any;
  out: any;

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
  }
  ngOnInit() {
    this.oilCanvas = document.getElementById("oilChart");


var oilData = {
    labels: [
        // "Saudi Arabia",
        // "Russia",
        // "Canada"
    ],
    datasets: [
        {
            data: [76 ,4 , 20],
            backgroundColor: [
                "#5AB452",
                "#EA6565",
                "#FBB642"
               
            ]
        }]
};

var pieChart = new Chart(this.oilCanvas, {
  type: 'pie',
  data: oilData
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
  }
  // const ctx5 = document.getElementById('doughnut');
  // const doughnut = new Chart(ctx5, {
  //   type: 'doughnut',
  //   data: {
  //     labels: [
  //       'Jan',
  //       'Feb',
  //       'Mar',
  //       'Apr',
  //       'May',
  //       'Jun',
  //       'Jul',
  //       'Aug',
  //       'Sept',
  //       'Oct',
  //       'Nov',
  //       'Dec',
  //     ],
  //     datasets: [
  //       {
  //         label: 'Present',
  //         data: 'present',
  //         backgroundColor: ['#2D11FA'],

  //         borderColor: [
  //           // 'rgba(255, 99, 132, 1)',
  //           // 'rgba(54, 162, 235, 1)',
  //           // 'rgba(255, 206, 86, 1)',
  //           // 'rgba(75, 192, 192, 1)',
  //           // 'rgba(153, 102, 255, 1)',
  //           // 'rgba(255, 159, 64, 1)',
  //           // 'rgba(255, 99, 132, 1)'
  //         ],
  //         // borderWidth: 1
  //       },
  //       {
  //         label: 'Absent',
  //         data: 'absent',
  //         backgroundColor: ['#FDA75A'],
  //         // pointStyle: 'circle',
  //         borderColor: [
  //           // 'rgba(255, 99, 132, 1)',
  //           // 'rgba(54, 162, 235, 1)',
  //           // 'rgba(255, 206, 86, 1)',
  //           // 'rgba(75, 192, 192, 1)',
  //           // 'rgba(153, 102, 255, 1)',
  //           // 'rgba(255, 159, 64, 1)',
  //           // 'rgba(255, 99, 132, 1)'
  //         ],
  //         // borderWidth: 1
  //       },
  //       {
  //         label: 'Leaves',
  //         data: 'leave',
  //         backgroundColor: ['#00C9FF'],
  //         // pointStyle: 'circle',
  //         borderColor: [
  //           // 'rgba(255, 99, 132, 1)',
  //           // 'rgba(54, 162, 235, 1)',
  //           // 'rgba(255, 206, 86, 1)',
  //           // 'rgba(75, 192, 192, 1)',
  //           // 'rgba(153, 102, 255, 1)',
  //           // 'rgba(255, 159, 64, 1)',
  //           // 'rgba(255, 99, 132, 1)'
  //         ],
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //     plugins: {
  //       legend: {
  //         labels: {
  //           padding: 40,
  //           usePointStyle: true,
  //           font: {
  //             size: 10,
  //           },
  //         },
  //       },
  //     }
  //   }
  // });

  //  myChart = new Chart("myChart", {
  
  //   type: 'pie',
  //   data: {
  //     labels: ['Red', 'Blue', 'Yellow'],
  //     datasets: [{
  //       label: '# of Votes',
  //       data: [12, 19, 3],
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)'
  //       ],
  //       hoverOffset: 4
  //       // borderWidth: 1

  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     },
  //   }
  // });

  contentdropdown1: boolean = false;
  dropdownOpen1() {
    this.contentdropdown = !this.contentdropdown;
  }


}



