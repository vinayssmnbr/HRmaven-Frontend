import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';
declare var $:any;
declare var checkboxOptions:any;
@Component({
  selector: 'app-recruitment-content',
  templateUrl: './recruitment-content.component.html',
  styleUrls: ['./recruitment-content.component.css']
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
  }
  constructor(private dashService:DashService){
    dashService.activeComponent = 'recruitment';
    dashService.headerContent = '';
  }
  showModal:boolean = false;
  showModalContent:boolean = false;
  firstStep:boolean = false;
  secondStep:boolean = false;
  thirdStep:boolean = false;
  showmodalcontent2:boolean = false;
  fourthStep:boolean = false;
  openModal() {
    this.showModal=true;
    this.showModalContent=true;
    this.firstStep=true;
    this.showmodalcontent2=false;
  }
  closeModal() {
   this.showModal=false;
  this.showModalContent=false;
  this.showmodalcontent2=false;
  this.thirdStep=false;
  this.fourthStep=false;
  }
  id: any = 'all';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }
  showModal5=false;
  openModal5(){
    this.showModal5 = true;
    this.showModalContent=true
  }
  
  closeModal5(){
    this.showModal5 = false;
    this.showModalContent=false;
  }
  }


