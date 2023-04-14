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
  
  onNextForm() {
    this.firstStep=false;
    this.secondStep=true;
  }

  onPreviousForm() {
    this.secondStep=false;
    this.firstStep=true;
  }
  nextForm1() {
  this.showmodalcontent2=true;
  this.firstStep=false;
  this.secondStep=false;
  this.showModalContent=false;
  this.thirdStep=true;

  }
 
  submit(){
    this.showModal=false;
    this.showModalContent=true;
    this.showmodalcontent2=false;
  }


  
    options = [
      { label: 'Option 1', value: 'option1', checked: false },
      { label: 'Option 2', value: 'option2', checked: false },
      { label: 'Option 3', value: 'option3', checked: false },
      { label: 'Option 4', value: 'option4', checked: false }
    ];
  
    selectAll(checked: boolean) {
      this.options.forEach(option => option.checked = checked);
    }
  
    optionSelected() {
      const allSelected = this.options.every(option => option.checked);
      const indeterminate = this.options.some(option => option.checked) && !allSelected;
      const selectAllCheckbox = document.getElementById('select-all') as HTMLInputElement;
      selectAllCheckbox.checked = allSelected;
      selectAllCheckbox.indeterminate = indeterminate;
    }
  }


