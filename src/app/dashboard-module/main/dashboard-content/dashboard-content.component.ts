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
  }

  leaves: any[] = [
   
   
  ]
  ngOnInit()
   {
    const optionMenu = document.querySelector<HTMLElement>('.select-menu')!,
      selectBtn = optionMenu.querySelector<HTMLElement>('.select-btn')!,
      options = optionMenu.querySelectorAll<HTMLElement>('.option'),
      sBtn_text = optionMenu.querySelector<HTMLElement>('.sBtn-text')!;
    selectBtn.addEventListener('click', () =>
      optionMenu.classList.toggle('active')
    );
    options.forEach((option) => {
      option.addEventListener('click', () => {
        let selectedOption =
          option.querySelector<HTMLElement>('.option-text')!.innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove('active');
      });
    });


    
    // Create a chart object
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
            data: [50, 800, 470, 500, 800, 600, 500, 400, 700, 300, 200, 100],
            backgroundColor: ['#2D11FA'],
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
            data: [230, 450, 250, 350, 730, 650, 570, 350, 100, 50, 300, 400],
            backgroundColor: ['#FDA75A'],
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
            data: [250, 300, 730, 740, 250, 450, 500, 800, 150, 200, 700, 1500],
            backgroundColor: ['#00C9FF'],
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
      },
    });
  }



     
}
