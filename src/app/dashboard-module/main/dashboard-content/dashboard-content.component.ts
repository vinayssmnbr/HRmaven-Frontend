import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
import { DashService } from '../../shared/dash.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../service/user.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css'],
})
export class DashboardContentComponent implements OnInit {
  // loader=false;
  loadermain: boolean = true;
  loader:boolean =false;
  isFromSignupPage = false;


  constructor(
    private route:ActivatedRoute,
    private userService :UserService ,
    public dashService: DashService,private http:HttpClient,
    @Inject(DOCUMENT) public document: Document,private elementRef: ElementRef
  ) {
    dashService.activeComponent = 'dashboard';
    dashService.headerContent = '';

    setTimeout(() => {
      this.loadermain = false;
    }, 3000);

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

  }


  
  personaldataForm = new FormGroup({
    name: new FormControl(''),
    totalemployee: new FormControl(''),
    phone: new FormControl(''),
    headOffice: new FormControl(''),
  })
  objectid = localStorage.getItem('objectid');
  submitPersonalData(data: any){
    console.log("personal data: ", data);
    this.userService.updatepersonals(this.objectid,data.value).subscribe((res: any)=>{
      console.log("personaldataForm.value res: ", res);
      console.log("personaldataForm.value data: ", data);
    });
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
    console.log("isFromSignupPage: ", this.isFromSignupPage);
    this.isFromSignupPage = this.userService.isFromSignupPage;
    console.log("isFromSignupPage: ", this.isFromSignupPage);

    this.dashService.graphcontent().subscribe((res:any)=>{
    if(res)
    {
      console.log('yeah');
      this.loader=true;
    }
    const present=[0,0,0,0,0,0,0,0,0,0,0,0];
    const absent=[0,0,0,0,0,0,0,0,0,0,0,0];
    const leave=[0,0,0,0,0,0,0,0,0,0,0,0];
    res.map((d)=>{
      present[d.month]=d.present;
      absent[d.month]=d.absent;
      leave[d.month]=d.leave;
    })
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
            data: present,
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
            data:absent,
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
            data: leave,
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

storeObjectId: any = '';




array: any = [
  {
    id: 0,
    name: '0-50',
  },
  {
    id: 1,
    name: '50-100',
  },
  {
    id: 2,
    name: '100-150',
  },
  {
    id: 3,
    name: '150-200',
  },
  {
    id: 4,
    name: '200-250',
  },
  {
    id: 5,
    name: '250-300',
  },

];
dropdownOptions = [
    { option: '0-50' },  { option: '50-100' },  { option: '100-150' },
    { option: '150-200' },    { option: '200-250' },     { option: '250-300' }

  ];


contentdropdown: boolean = false;
dropdownOpen() {

  this.contentdropdown = !this.contentdropdown;
}
Selectvariable: string = 'Select';
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

