import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayEventDetailComponent } from './day-event-detail.component';

describe('DayEventDetailComponent', () => {
  let component: DayEventDetailComponent;
  let fixture: ComponentFixture<DayEventDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayEventDetailComponent]
    });
    fixture = TestBed.createComponent(DayEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
