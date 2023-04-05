import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceContentComponent } from './attendance-content.component';

describe('AttendanceContentComponent', () => {
  let component: AttendanceContentComponent;
  let fixture: ComponentFixture<AttendanceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
