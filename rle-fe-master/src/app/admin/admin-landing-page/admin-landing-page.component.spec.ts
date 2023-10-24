import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LandingPageService } from 'src/app/services/landingpage/landing-page.service';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { AdminLandingPageComponent } from './admin-landing-page.component';
import { GalleryComponent, GalleryModule } from 'ng-gallery';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminLandingPageComponent', () => {
  let component: AdminLandingPageComponent;
  let fixture: ComponentFixture<AdminLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLandingPageComponent, GalleryComponent ],
        imports:[
          RouterTestingModule,
          ToastrModule.forRoot(),
          GalleryModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientTestingModule
        ],
      providers: [ 
        LandingPageService, 
        GalleryService, 
        FormBuilder, 
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              snapshot: {
                paramMap: {
                  get: () => 'test-lab-id'
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the lab details form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#inputlabname')).toBeTruthy();
    expect(compiled.querySelector('#labOverview')).toBeTruthy();
    expect(compiled.querySelector('#address')).toBeTruthy();
    expect(compiled.querySelector('#phone')).toBeTruthy();
    expect(compiled.querySelector('#email')).toBeTruthy();
  });

  it('should have the correct configuration and columns for ngx-easy-table', () => {
   component.configuration.searchEnabled = false;

    expect(component.configuration).toEqual(jasmine.objectContaining(DefaultConfig));
    expect(component.columns).toEqual(jasmine.any(Array));
    expect(component.columns.length).toEqual(5);
    expect(component.columns[0].key).toEqual('phone');
    expect(component.columns[1].key).toEqual('age');
    expect(component.columns[2].key).toEqual('company');
    expect(component.columns[3].key).toEqual('name');
    expect(component.columns[4].key).toEqual('isActive');
  });
});
