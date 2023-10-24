import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdmissionsComponent } from './admin-admissions.component';

describe('AdminAdmissionsComponent', () => {
  let component: AdminAdmissionsComponent;
  let fixture: ComponentFixture<AdminAdmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdmissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
