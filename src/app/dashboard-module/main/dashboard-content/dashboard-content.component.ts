import { Component, OnInit, Inject } from '@angular/core';
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
  constructor(
    public dashService: DashService,private http:HttpClient,
    @Inject(DOCUMENT) public document: Document
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
    // const optionMenu = document.querySelector<HTMLElement>('.select-menu')!,
    //   selectBtn = optionMenu.querySelector<HTMLElement>('.select-btn')!,
    //   options = optionMenu.querySelectorAll<HTMLElement>('.option'),
    //   sBtn_text = optionMenu.querySelector<HTMLElement>('.sBtn-text')!;
    // selectBtn.addEventListener('click', () =>
    //   optionMenu.classList.toggle('active')
    // );
    // options.forEach((option) => {
    //   option.addEventListener('click', () => {
    //     let selectedOption =
    //       option.querySelector<HTMLElement>('.option-text')!.innerText;
    //     sBtn_text.innerText = selectedOption;
    //     optionMenu.classList.remove('active');
    //   });
    // });



    // Create a chart object

  }


  showchart(){

    this.dashService.getreport().subscribe((res:any)=>{
    const myChart = new Chart('myChart', {
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
  }




updateLeaveStatus(id: any, status: 'accept' | 'reject') {
  const url = `http://45.138.16.177:3000/api/leave/${id}`;
  const body = { status: status };
  this.http.patch(url, JSON.stringify(body), { headers: { 'content-type': 'application/json' } }
  ).subscribe(response => {
    console.log('Leave status updated successfully: ', response);

  }, error => {
    console.error('Error updating leave status:', error);

  });

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
    id: 3,
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

}
