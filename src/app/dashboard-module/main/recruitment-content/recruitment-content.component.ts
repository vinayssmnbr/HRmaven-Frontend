import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashService } from '../../shared/dash.service';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
declare var checkboxOptions: any;
@Component({
  selector: 'app-recruitment-content',
  templateUrl: './recruitment-content.component.html',
  styleUrls: ['./recruitment-content.component.css'],
})
export class RecruitmentContentComponent {
  ngOnInit() {
    // ------------Drop Down Menu----------
    const optionMenu = document.querySelector<HTMLElement>('.filter-menu')!,
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
    // this.fetchjobVacancies();
  }
  constructor(private dashService: DashService, private cookie: CookieService) {
    dashService.activeComponent = 'recruitment';
    dashService.headerContent = '';

    this.fetchjobVacancies();
  }
  showModal: boolean = false;
  showModalContent: boolean = false;
  firstStep: boolean = false;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  showmodalcontent2: boolean = false;
  fourthStep: boolean = false;
  jobDetails: any = [];
  loading: boolean = false;
  openModal() {
    this.showModal = true;
    this.showModalContent = true;
    this.firstStep = true;
    this.showmodalcontent2 = false;
  }
  closeModal() {
    this.showModal = false;
    this.showModalContent = false;
    this.showmodalcontent2 = false;
    this.thirdStep = false;
    this.fourthStep = false;
  }
  id: any = 'all';
  tabChange1(ids: any) {
    console.log('yeahhhhhh');
    if(this.Selectvariable!='' && this.Selectvariable1!='' && this.Selectvariable2!='' )
    {
      this.id = ids;
      let data = this.vacancyForm.value;
    }


  }

  showModal5 = false;
  openModal5() {
    this.showModal5 = true;
    this.showModalContent = true;
  }

  closeModal5() {
    this.showModal5 = false;
    this.showModalContent = false;
  }
  unread: boolean = false;
  all: boolean = false;
  next() {
    this.unread = true;
    this.all = false;
  }

  vacancyForm = new FormGroup({
    job_title: new FormControl('', [
      Validators.pattern('[a-zA-Z ]+'),
      Validators.required,
    ]),
    date: new FormControl('',Validators.required),
    ctc: new FormControl('', Validators.required),
    job_type: new FormControl('', Validators.required),
    experience: new FormControl('',Validators.required),
    location: new FormControl('', Validators.required),
  });

  vacancyForm1 = new FormGroup({
    skill: new FormControl('', Validators.required),
    // job_description: new FormControl(''),
    // recruiter: new FormControl(''),
  });

  vacancyForm2 = new FormGroup({
    job_description: new FormControl('',Validators.required),
    recruiter: new FormControl('',[
        Validators.pattern('[a-zA-Z ]+'),
        Validators.required,
      ]),
  });
  vacancydetail() {
    console.warn(this.vacancyForm.value);
  }

  array: any = [
    {
      id: 0,
      name: 'Jalandhar',
    },
    {
      id: 1,
      name: 'Gurugram',
    },
    {
      id: 2,
      name: 'Chandigarh',
    },
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = '';
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown = false;
    console.log(arr.name);
  }

  /*-------------------Experience-dropdown--------------*/

  array1: any = [
    {
      id: 0,
      name: '0-1 Year',
    },
    {
      id: 1,
      name: '1-2 Year',
    },
    {
      id: 2,
      name: '2-3 Year',
    },
  ];
  contentdropdown1: boolean = false;
  dropdownOpen1() {
    this.contentdropdown1 = !this.contentdropdown1;
  }
  Selectvariable1: string = '';
  colorvariable1: number = 0;
  Changeselect1(arr1: any) {
    this.Selectvariable1 = arr1.name;
    this.colorvariable1 = arr1.id;
    this.contentdropdown1 = false;
    console.log(arr1.name);
  }

  array2: any = [
    {
      id: 0,
      name: 'Full Time',
    },
    {
      id: 1,
      name: 'Internship',
    },
  ];
  contentdropdown2: boolean = false;
  dropdownOpen2() {
    this.contentdropdown2 = !this.contentdropdown2;
  }
  Selectvariable2: string = '';
  colorvariable2: number = 0;
  Changeselect2(arr2: any) {
    this.Selectvariable2 = arr2.name;
    this.colorvariable2 = arr2.id;
    this.contentdropdown2 = false;
    console.log(arr2.name);
    // this.user.jobtype=arr2.jobtype
  }

  list: any[] = [];
  item: string = '';
  addtask(item: string) {
    if (this.item.trim() !== '') {
      this.list.push({ id: this.list.length, name: this.item });
      console.warn('list', this.list);
      this.item = '';
    }
  }
  removetask(id: number) {
    console.warn(id);
    this.list = this.list.filter((item) => item.id !== id);
  }

  recruiter: any[] = [];
  item1: string = '';
  addtask1(item1: string) {
    this.recruiter.push({ id: this.recruiter.length, name: this.item1 });
    console.warn('jijrgk', this.recruiter);
    this.item1 = '';
  }
  removetask1(id: number) {
    console.warn(id);
    this.recruiter = this.recruiter.filter((item1) => item1.id !== id);
  }

  jobvacancyform = new FormGroup({
    jobtitle: new FormControl('', [Validators.required]),
    // datetitle:new FormControl('')
    datetitle: new FormControl('', Validators.required),
  });
  jobvacancydetail() {
    console.log(this.vacancyForm.value);
  }

  forget_email_send_content: boolean = false;
  shownewjobmodal() {
    this.forget_email_send_content = true;
  }
  // firststep:boolean=false;
  // seconstep:boolean=false;
  // nextform(){
  //   this.firststep=false;
  //   this.seconstep=true;

  successmodal: boolean = false;
  fetchjobVacancies() {
    this.dashService.fetchJobVecancies().subscribe((res: any) => {
      this.jobDetails = res.response;
    });
  }
  successfulmodal() {
    this.loading = true;
    this.showModal5 = true;
    const jobDescription = this.vacancyForm2.get('job_description')?.value;
    let data = {
      ...this.vacancyForm.value,
      list: this.list,
      recruiter: this.recruiter,
      job_description: jobDescription,
      hrid: this.cookie.get('hr_id'),
    };
    this.dashService.addJobVacancies(data).subscribe((res) => {
      console.log('job', res);
      this.fetchjobVacancies();
      this.loading = false;
      this.showModal5 = false;
      this.successmodal = true;
    });
  }
  closesuccessmodal() {
    this.successmodal = false;
  }
  selecteedJobDetail: any;
  selectjob(item: any) {
    this.dashService.setselecteedJobDetail(item);
  }
}
