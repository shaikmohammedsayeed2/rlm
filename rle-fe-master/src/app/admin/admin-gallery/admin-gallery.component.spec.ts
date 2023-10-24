import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Rx from 'rxjs';

import { AdminGalleryComponent } from './admin-gallery.component';
import { AdminModule } from '../admin.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { DatePipe } from '@angular/common';

describe('AdminGalleryComponent', () => {
  let component: AdminGalleryComponent;
  let fixture: ComponentFixture<AdminGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGalleryComponent ],
      imports:[AdminModule,HttpClientTestingModule,RouterTestingModule,ToastrModule.forRoot()],
      providers:[ToastrService,
        GalleryService,
         DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngon init',()=>{
    const fixture = TestBed.createComponent(AdminGalleryComponent);
  const component = fixture.debugElement.componentInstance;
  spyOn(component, 'getAllGalleryEvents').and.returnValue(Rx.of([]));
  component.ngOnInit();
  expect(component.getAllGalleryEvents).toHaveBeenCalled();
  });
});
