import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ResearchService } from 'src/app/services/research/research.service';

import { PublicationsComponent } from './publications.component';

describe('PublicationsComponent', () => {
  let component: PublicationsComponent;
  let fixture: ComponentFixture<PublicationsComponent>;
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

    researchService = jasmine.createSpyObj('ResearchService', ['getAllPublications']);

    await TestBed.configureTestingModule({
      declarations: [ PublicationsComponent ],
      providers: [
        { provide: ResearchService, useValue: researchService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set publicationsList property with data from researchService.getAllPublications', () => {
    const publications = [
      { pub_title: 'Publication 1', description: 'Description 1', blob_storage: 'https://publication1.com' },
      { pub_title: 'Publication 2', description: 'Description 2', blob_storage: 'https://publication2.com' }
    ];
    researchService.getAllPublications.and.returnValue(of(publications));
    component.ngOnInit();
    expect(component.publicationsList).toEqual(publications);
  });

  it('should render publication items in the template', () => {
    const publications = [
      { pub_title: 'Publication 1', description: 'Description 1', blob_storage: 'https://publication1.com' },
      { pub_title: 'Publication 2', description: 'Description 2', blob_storage: 'https://publication2.com' }
    ];
    researchService.getAllPublications.and.returnValue(of(publications));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.square').length).toBe(publications.length);
    expect(compiled.querySelectorAll('.square li')[0].textContent).toContain(publications[0].description);
  });
});

