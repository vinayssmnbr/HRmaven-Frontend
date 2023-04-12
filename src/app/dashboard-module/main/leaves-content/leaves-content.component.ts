import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
// import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css'],
})
export class LeavesContentComponent {


  circularProgress: any;
  progressValue: any;
  progressStartValue = 0;
  progressEndValue = 50;
  speed = 100;
  progressInterval: any;
  test: any = 'All';
  // searchText: string;
  status: string;
  leaves: any[] = []
  employeeid="";
  employeename="";


  ngOnInit() {
    // ------------Drop Down Menu----------
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
  }

  constructor(private dashService: DashService, private http: HttpClient) {
    dashService.activeComponent = 'leaves';
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




  }

  changeFilter(value: any) {
    this.test = value;
    console.log(this.test);
  }


  updateLeaveStatus(id: any, status: 'accept' | 'reject') {
    const url = `http://localhost:3000/api/leave/${id}`;
    const body = { status: status };
    this.http.patch(url, JSON.stringify(body), { headers: { 'content-type': 'application/json' } }
    ).subscribe(response => {
      console.log('Leave status updated successfully: ', response);

    }, error => {
      console.error('Error updating leave status:', error);

    });

  }
  onAccept(id: any) {
    this.updateLeaveStatus(id, 'accept');
  }

  onReject(id: any) {
    this.updateLeaveStatus(id, 'reject');
  }








}
