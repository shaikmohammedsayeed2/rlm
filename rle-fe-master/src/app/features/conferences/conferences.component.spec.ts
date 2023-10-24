// import { ComponentFixture, TestBed, async } from '@angular/core/testing';

// import { ConferencesComponent } from './conferences.component';
// import { ResearchService } from 'src/app/services/research/research.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { FeaturesModule } from '../features.module';


// describe('ConferencesComponent',()=>{
//     beforeEach(async(()=>{
//       TestBed.configureTestingModule({
//         imports:[
//           RouterTestingModule,
//           HttpClientTestingModule,
//           FeaturesModule
//         ],
//         declarations:[
//             ConferencesComponent
//         ],
//         providers:[
//             ResearchService,
//         ]
//       }).compileComponents();
//     }));
//     it('should create the app',()=>{
//       const fixture = TestBed.createComponent(ConferencesComponent);
//       const component = fixture.debugElement.componentInstance;
//       expect(component).toBeTruthy();
//     });
  
//     it('should call ngon init',()=>{
//       const fixture = TestBed.createComponent(ConferencesComponent);
//       const component = fixture.debugElement.componentInstance;
//       let spy_getAllConferences = spyOn(component,"getAllConferences").and.returnValue([]);
//       component.ngOnInit();
//       expect(component.getAllConferences()).toEqual([]);
//     })
//   })


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferencesComponent } from './conferences.component';
import { ResearchService } from 'src/app/services/research/research.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ConferencesComponent', () => {
  let component: ConferencesComponent;
  let fixture: ComponentFixture<ConferencesComponent>;
  let researchService: jasmine.SpyObj<ResearchService>;
  let activatedRoute: any;

  beforeEach(async () => {
    activatedRoute = {
      parent: {
        snapshot: {
          paramMap: {
            get: () => '1' // lab_id parameter value
          }
        }
      }
    };

    researchService = jasmine.createSpyObj('ResearchService', ['getAllConferences']);

    await TestBed.configureTestingModule({
      declarations: [ ConferencesComponent ],
      providers: [
        { provide: ResearchService, useValue: researchService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call researchService.getAllConferences with lab_id parameter', () => {
    const conferences = [
      { conf_title: 'Conference 1', description: 'Description 1', blob_storage: 'https://conference1.com' },
      { conf_title: 'Conference 2', description: 'Description 2', blob_storage: 'https://conference2.com' }
    ];
    researchService.getAllConferences.and.returnValue(of(conferences));
    component.ngOnInit();
    expect(researchService.getAllConferences).toHaveBeenCalledWith('1'); // lab_id parameter value
  });

  it('should set conferences property with data from researchService.getAllConferences', () => {
    const conferences = [
      { conf_title: 'Conference 1', description: 'Description 1', blob_storage: 'https://conference1.com' },
      { conf_title: 'Conference 2', description: 'Description 2', blob_storage: 'https://conference2.com' }
    ];
    researchService.getAllConferences.and.returnValue(of(conferences));
    component.ngOnInit();
    expect(component.conferences).toEqual(conferences);
  });
});
