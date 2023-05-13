import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetempComponent } from './forgetemp.component';

describe('ForgetempComponent', () => {
  let component: ForgetempComponent;
  let fixture: ComponentFixture<ForgetempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
