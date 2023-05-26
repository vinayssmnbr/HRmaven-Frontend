import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../shared/emp.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css'],
})
export class RecruitmentComponent {
  constructor(public empService: EmpService) {
    empService.activeComponent = 'recruitment';
    empService.headerContent = '';

    this.fetchjob();

  }
  skill:any="";
  jobs:any=[];
  ngOnInit(): void {
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

  }
  // constructor(private dashService: DashService) {
  //   dashService.activeComponent = 'recruitment';
  //   dashService.headerContent = '';
  // }
  showModal: boolean = false;
  showModalContent: boolean = false;
  firstStep: boolean = false;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  showmodalcontent2: boolean = false;
  fourthStep: boolean = false;
  job:any=[];
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
  tabChange(ids: any) {
    if (this.Selectvariable != 'Select' && this.Selectvariable1 != 'Select' && this.Selectvariable2 != 'Select') {
      this.id = ids;
    }
    console.log(this.id);
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
    jobtitle: new FormControl(''),
    datetitle: new FormControl(''),
    date: new FormControl(''),
    ctctitle: new FormControl(''),
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
  Selectvariable: string = 'Select';
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
      name: '0 Experience',
    },
    {
      id: 1,
      name: '1-2 Years',
    },
    {
      id: 2,
      name: '2-3 Years',
    },
  ];
  contentdropdown1: boolean = false;
  dropdownOpen1() {
    this.contentdropdown1 = !this.contentdropdown1;
  }
  Selectvariable1: string = 'Select';
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
  Selectvariable2: string = 'Select';
  colorvariable2: number = 0;
  Changeselect2(arr2: any) {
    this.Selectvariable2 = arr2.name;
    this.colorvariable2 = arr2.id;
    this.contentdropdown2 = false;
    console.log(arr2.name);
  }

  list: any[] = [];
  addtask(item: string) {
    this.skill = '';
    this.list.push({ id: this.list.length, name: item });
    console.warn(this.list);
  }
  removetask(id: number) {
    console.warn(id);
    this.list = this.list.filter((item) => item.id !== id);
  }

  list1: any[] = [];
  addtask1(item1: string) {
    this.list.push({ id: this.list.length, name: item1 });
    console.warn(this.list1);
  }
  removetask1(id: number) {
    console.warn(id);
    this.list1 = this.list1.filter((item1) => item1.id !== id);
  }

  jobvacancyform = new FormGroup({
    jobtitle: new FormControl('', [Validators.required]),
    datetitle: new FormControl(''),
  });
  jobvacancydetail() {
    console.warn(this.vacancyForm.value);
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
  successfulmodal() {
    this.successmodal = true;
    this.showModal5 = false;
  }

  closesuccessmodal() {
    this.successmodal = false;
  }
  id1: any = 'all';
  tabChange1(ids: any) {
    this.id1 = ids;
    console.log(this.id1);
  }

  fetchjob(){
    this.empService.fetchjob().subscribe((res:any)=>{
      this.jobs=res.data[0].job;
      console.log(this.jobs);

    })
  }

}
