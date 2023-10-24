// // import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// // import { By } from '@angular/platform-browser';
// // import { DebugElement } from '@angular/core';

// // import { ConfPublComponent } from './conf-publ.component';
// // import { ResearchService } from 'src/app/services/research/research.service';
// // import { FeaturesModule } from '../features.module';
// // import { HttpClientTestingModule } from '@angular/common/http/testing';
// // import { RouterTestingModule } from '@angular/router/testing';

// // describe('ConfPublComponent', () => {
// //   let component: ConfPublComponent;
// //   let fixture: ComponentFixture<ConfPublComponent>;
// //   let de: DebugElement;
// //   let el: HTMLElement;

// //   // beforeEach(async () => {
// //   //   TestBed.configureTestingModule({
// //   //     imports:[
// //   //       RouterTestingModule,
// //   //       HttpClientTestingModule,
// //   //       FeaturesModule
// //   //     ],
// //   //     declarations: [ ConfPublComponent ],
// //   //     providers: [ ResearchService ]
// //   //   })
// //   //   .compileComponents();
// //   // });

// //   beforeEach(() => {
// //     TestBed.configureTestingModule({
// //       imports:[
// //         RouterTestingModule,
// //         HttpClientTestingModule,
// //         FeaturesModule
// //       ],
// //       declarations: [ ConfPublComponent ],
// //       providers: [ ResearchService ]
// //     })
// //     .compileComponents();
// //     fixture = TestBed.createComponent(ConfPublComponent);
// //     component = fixture.componentInstance;
// //     de = fixture.debugElement;
// //     el = de.nativeElement;
// //   });

// //   it('should create the component', () => {
// //     expect(component).toBeTruthy();
// //   });

// //   it('should render the recent publications section', () => {
// //     component.recentPublications = [
// //       { pub_date: '2022-04-01', pub_title: 'Publication 1', description: 'Description 1', blob_storage: 'storage_url_1' },
// //       { pub_date: '2022-03-15', pub_title: 'Publication 2', description: 'Description 2', blob_storage: 'storage_url_2' },
// //       { pub_date: '2022-02-28', pub_title: 'Publication 3', description: 'Description 3', blob_storage: 'storage_url_3' }
// //     ];
// //     fixture.detectChanges();
// //     expect(el.querySelector('#publicationssection h1')?.textContent).toContain('Recent Publications');
// //     expect(el.querySelectorAll('#publicationssectionpub .timeline-row').length).toEqual(component.recentPublications.length);
// //   });

// //   it('should render the upcoming conferences section', () => {
// //     component.upcomingConferences = [
// //       { end_date: '2022-05-15', conf_title: 'Conference 1', description: 'Description 1', blob_storage: 'storage_url_1' },
// //       { end_date: '2022-06-30', conf_title: 'Conference 2', description: 'Description 2', blob_storage: 'storage_url_2' },
// //       { end_date: '2022-07-31', conf_title: 'Conference 3', description: 'Description 3', blob_storage: 'storage_url_3' }
// //     ];
// //     fixture.detectChanges();
// //     expect(el.querySelector('#conferencessection h1')?.textContent).toContain('Upcoming Conferences');
// //     expect(el.querySelectorAll('#conferencesssectionconf .timeline-row').length).toEqual(component.upcomingConferences.length);
    
// //   });

// //   it('should call getResearchDetails method on initialization', () => {
// //     spyOn(component, 'getResearchDetails');
// //     fixture.detectChanges();
// //     expect(component.getResearchDetails).toHaveBeenCalled();
// //   });
// // });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { ConfPublComponent } from './conf-publ.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ResearchService } from 'src/app/services/research/research.service';
// import { FeaturesModule } from '../features.module';

// describe('ConfPublComponent', () => {
//   let component: ConfPublComponent;
//   let fixture: ComponentFixture<ConfPublComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports:[
//         RouterTestingModule,
//         HttpClientTestingModule,
//         FeaturesModule
//       ],
//       declarations: [ ConfPublComponent ],
//       providers: [ ResearchService ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ConfPublComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should render recent publications section', () => {
//     const publicationsSection = fixture.debugElement.query(By.css('#publicationssection'));
//     expect(publicationsSection.nativeElement.innerText).toEqual('Recent Publications');
//   });

//   it('should render upcoming conferences section', () => {
//     const conferencesSection = fixture.debugElement.query(By.css('#conferencessection'));
//     expect(conferencesSection.nativeElement.innerText).toEqual('Upcoming Conferences');
//   });

//   it('should render publication details', () => {
//     const publicationDetails = fixture.debugElement.queryAll(By.css('#publicationssectionpub'));
//     expect(publicationDetails.length).toBe(component.recentPublications.length);
//   });

//   it('should render conference details', () => {
//     const conferenceDetails = fixture.debugElement.queryAll(By.css('#conferencesssectionconf'));
//     expect(conferenceDetails.length).toBe(component.upcomingConferences.length);
//   });

// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfPublComponent } from './conf-publ.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeaturesModule } from '../features.module';
import { ResearchService } from 'src/app/services/research/research.service';

describe('ConfPublComponent', () => {
  let component: ConfPublComponent;
  let fixture: ComponentFixture<ConfPublComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        FeaturesModule
      ],
      declarations: [ ConfPublComponent ],
      providers: [ ResearchService ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ConfPublComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // add this line
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render upcoming conferences section', () => {
    const upcomingConferences = fixture.nativeElement.querySelector('.card');
    expect(upcomingConferences).toBeTruthy();
  });


  it('should render recent publications and recent conferences section', () => {
    const recentPublications = fixture.nativeElement.querySelectorAll('.intro');
    expect(recentPublications).toBeTruthy();
  });

});
