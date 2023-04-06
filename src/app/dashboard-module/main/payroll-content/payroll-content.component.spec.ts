import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollContentComponent } from './payroll-content.component';

describe('PayrollContentComponent', () => {
  let component: PayrollContentComponent;
  let fixture: ComponentFixture<PayrollContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
