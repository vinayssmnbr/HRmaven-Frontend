import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesContentComponent } from './leaves-content.component';

describe('LeavesContentComponent', () => {
  let component: LeavesContentComponent;
  let fixture: ComponentFixture<LeavesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
