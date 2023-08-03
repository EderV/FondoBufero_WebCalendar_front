import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatAdminComponent } from './feat-admin.component';

describe('AdminComponent', () => {
  let component: FeatAdminComponent;
  let fixture: ComponentFixture<FeatAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatAdminComponent]
    });
    fixture = TestBed.createComponent(FeatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
