import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayEventComponent } from './day-event.component';

describe('DayEventComponent', () => {
  let component: DayEventComponent;
  let fixture: ComponentFixture<DayEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayEventComponent]
    });
    fixture = TestBed.createComponent(DayEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
