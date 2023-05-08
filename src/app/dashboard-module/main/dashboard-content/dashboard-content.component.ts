import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
import { DashService } from '../../shared/dash.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css'],
})
export class DashboardContentComponent implements OnInit {
  // loader=false;
  loadermain: boolean = true;
  loader: boolean = false;
  isFromSignupPage = false;
  formSubmitted = false;
  showModalContent: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public dashService: DashService,
    private http: HttpClient,
    @Inject(DOCUMENT) public document: Document,
    private elementRef: ElementRef
  ) {
    dashService.activeComponent = 'dashboard';
    dashService.headerContent = '';

    setTimeout(() => {
      this.loadermain = false;
    }, 3000);
  }

  personaldataForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern("^[A-Z]+[a-zA-Z ]*$")]),
    domain: new FormControl('', [Validators.required, Validators.pattern("^(?!-)[A-Za-z0-9-]+([\\-\\.]{1}[a-z0-9]+)*\\.[A-Za-z]{2,6}$")]),
    phone: new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    headOffice: new FormControl('',[Validators.required,Validators.pattern("^[A-Z]+[a-zA-Z ]*$")]),
    // headOffice: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),

  })
  email = localStorage.getItem('emailid');
  submitPersonalData(data: any){
    console.log("personal data: ", data);
    this.userService.addpersonals(this.email,data).subscribe((res: any)=>{
      console.log("personaldataForm.value res: ", res);
      console.log("personaldataForm.value data: ", data);
      // this.formSubmitted = true;
      localStorage.setItem('empname', this.formData.name);
      this.showForm = false;
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
      head: 'Organisational meetings',
      time: '10am to 12pm',
    },
    {
      day: 'Mon',
      Date: '21',
      head: 'Meeting with the manager',
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
    ul.addEventListener('mouseleave', () => {
      ul.classList.add('close');
    });
  }

  leaves: any[] = [


  ]
  personalData: any =''
  empname: any = ''
  objectuserid = localStorage.getItem('emailid')
  showModal: boolean = false
  formData: any = ''
  opacityValue =0;
  // public opacityValue = 0;
    showForm = false
  ngOnInit()
   {

    this.dashService.getleavecontent().subscribe((res:any)=>{
      res.map((d: any) => {
        if (d._id == 'pending') {
          this.leaves = d.pending;
        }
      });
    });
    this.opacityValue = 0;

    // this.empname = localStorage.getItem('empname');

    // if (this.empname) {
    //   this.formSubmitted = true;
    //   this.showForm = false;
    // } else {
    //   this.formSubmitted = false;
    //   this.showForm = true;

    //   // Update the opacityValue to 1 if the user has not submitted the form
    //   this.opacityValue = 1;
    // }
    // this.empname = localStorage.getItem('empname');

    // if (this.empname) {
    //   this.formSubmitted = true;
    //   this.showForm = false;
    //   this.opacityValue = 0;
    // } else {
    //   this.formSubmitted = false;
    //   this.showForm = true;
    //   this.opacityValue = 1;
    // }

    this.opacityValue = 0
    this.empname = localStorage.getItem('empname');

    if (this.empname) {
      this.formSubmitted = true;
      this.showForm = false;
      // this.userService.opacityValue = 0
      this.opacityValue = 0;
    } else {
      this.formSubmitted = false;
      this.showForm = true;
      // this.userService.opacityValue = 1
      this.opacityValue = 1;
    }



    this.userService.getpersonals(this.objectuserid).subscribe((res: any) => {
      console.log("res account settings personaldata: ", res);

      console.log("res account settings personaldata: ", res.personaldata);
      console.log("res account settings personaldata: ", res.personaldata.headOffice);

      console.log("res account settings personaldata: ", res.useridd);

      // this.empname = res.personaldata.name;
      // localStorage.setItem('empname', this.empname)
      // this.employeename = res.personaldata.name;
      // this.totalemployee = res.personaldata.noOfEmployee;
      // this.headOffice = res.personaldata.headOffice;
      // this.phone = res.personaldata.phone;
      // this.description = res.personaldata.description
      // this.profileimage = res.personaldata.profileimage;


    this.empname = res.personaldata.name;
    localStorage.setItem('empname', this.empname);

    // // Update the formSubmitted and showForm variables based on empname
    if (this.empname) {
      this.formSubmitted = true;
      this.showForm = false;
      // this.userService.opacityValue = 0;
      this.opacityValue = 0;
    } else  {
      this.formSubmitted = false;
      this.showForm = true;
      // this.userService.opacityValue = 1;
      this.opacityValue = 1;
    }

    });


    // console.log("isFromSignupPage: ", this.isFromSignupPage);
    // this.isFromSignupPage = this.userService.isFromSignupPage;
    // console.log("isFromSignupPage: ", this.isFromSignupPage);

    this.dashService.graphcontent().subscribe((res: any) => {
      if (res) {
        console.log('yeah');
        this.loader = true;
      }
      const present = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const absent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const leave = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      res.map((d) => {
        present[d.month] = d.present;
        absent[d.month] = d.absent;
        leave[d.month] = d.leave;
      });
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
              data: absent,
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
                  size: 10,
                },
              },
            },
          },
        },
      });
    });

    // Create a chart object
  }



  // clickClose() {
  //   this.closeModal = false;
  // }

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
    { option: '0-50' },
    { option: '50-100' },
    { option: '100-150' },
    { option: '150-200' },
    { option: '200-250' },
    { option: '250-300' },
  ];
  officeOptions = [
    { option: '0-50' },
    { option: '50-100' },
    { option: '100-150' },
    { option: '150-200' },
    { option: '200-250' },
    { option: '250-300' },
  ];

  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Select';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
  }

  updateLeaveStatus(object: any, status: 'accept' | 'reject') {
    // this.dashService.updateleave(object,status);
  }



  //Modal ts//
  showModal10=false;
  openModal10(){
    this.showModal10 = true;
    this.showModalContent=true
  }

  closeModal10(){
    this.showModal10 = false;
    this.showModalContent=false;
  }

  showModal11=false;
  openModal11(){
    this.showModal11 = true;
    this.showModalContent=true
  }

  closeModal11(){
    this.showModal11 = false;
    this.showModalContent=false;
  }


  array1: any = [
    {
      id: 0,
      name: 'Online',
    },
    {
      id: 1,
      name: 'Offline',
    },
  ];
  Venuelink:boolean=false;
  Meetinglink:boolean=true;
  contentdropdown1: boolean = false;
  dropdownOpen1() {
    this.contentdropdown1 = !this.contentdropdown1;
  }
  Selectvariable1: string = 'online';
  colorvariable1: number = 0;
  Changeselect1(arr1: any) {
    if (arr1.id == 0){
      this.Meetinglink=true;
      this.Venuelink=false;
    }
    if(arr1.id==1){
      this.Venuelink=true;
      this.Meetinglink=false;
    }

    this.Selectvariable1 = arr1.name;
    this.colorvariable1 = arr1.id;
    this.contentdropdown1 = false;
    console.log(arr1.name);
  }

  /*--------------------Create New Modal----------------------*/
  meetingForm=new FormGroup({
    meetingtitle:new FormControl(''),
    mode:new FormControl(''),
    date:new FormControl(''),
    starttime:new FormControl(''),
    endtime:new FormControl(''),
    meetinglink:new FormControl(''),
    venue:new FormControl(''),
    inviteanemplyee:new FormControl(''),
  })
  meetingdetail()
{
  console.warn(this.meetingForm.value);
}
}
