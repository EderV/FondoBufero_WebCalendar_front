import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatAboutComponent } from './feat-about.component';

describe('FeatAboutComponent', () => {
  let component: FeatAboutComponent;
  let fixture: ComponentFixture<FeatAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatAboutComponent]
    });
    fixture = TestBed.createComponent(FeatAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
