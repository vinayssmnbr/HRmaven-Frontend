import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContentComponent } from './employee-content.component';

describe('EmployeeContentComponent', () => {
  let component: EmployeeContentComponent;
  let fixture: ComponentFixture<EmployeeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
